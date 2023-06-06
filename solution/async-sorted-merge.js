"use strict";
const MinHeap = require("./minheap");
// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  let priorityQueue = new MinHeap();
  let buffers = [];
  let isDrained = {};
  for (let i in logSources) {
    buffers[i] = [];
  }

  // Core algorithm is the same as sync solution
  // except we maintain a buffer of async popped elements
  await hydrateBuffers(buffers, logSources, isDrained);

  while (logsRemaining(buffers)) {
    for (let i in buffers) {
      addToQueue(priorityQueue, i, buffers);
    }

    while (priorityQueue.size() > 0) {
      let entry = priorityQueue.pop().val;
      printer.print(entry.logEntry);

      if (buffers[entry.idx].length === 0) {
        if (!isDrained[entry.idx]) {
          await hydrateBuffers(buffers, logSources, isDrained);
          addToQueue(priorityQueue, entry.idx, buffers);
        }
      } else {
        addToQueue(priorityQueue, entry.idx, buffers);
      }
    }
  }

  printer.done();
};

async function hydrateBuffers(buffers, logSources, isDrained) {
  // Batch size is arbitrary when working with a single thread.
  // If we used worker threads, we could increase parallelization
  // and reduce total execution time
  const batchSize = logSources.length;
  for (let n = 0; n < batchSize; n++) {
    let promises = [];
    for (let i in logSources) {
      if (!isDrained[i]) {
        promises.push(getNextForSource(buffers, i, logSources, isDrained));
      }
    }

    await Promise.all(promises);
  }
}

async function getNextForSource(buffers, idx, logSources, isDrained) {
  let logEntry = await logSources[idx].popAsync();
  if (logEntry !== false) {
    buffers[idx].push(logEntry);
  } else {
    isDrained[idx] = true;
  }
}

function logsRemaining(buffers) {
  for (let buffer of buffers) {
    if (buffer.length > 0) return true;
  }

  return false;
}

async function addToQueue(queue, idx, sourceBuffers) {
  let logEntry = sourceBuffers[idx].shift();
  if (logEntry) {
    queue.insert({ logEntry, idx }, logEntry.date);
  }
}
