"use strict";
const MinHeap = require("./minheap");

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  let priorityQueue = new MinHeap();

  // Add first element of each source to queue
  for (let i in logSources) {
    addToQueue(priorityQueue, i, logSources);
  }

  // Pop from queue
  // Add next element from source that the popped element came from
  // Continue until queue is empty
  while (priorityQueue.size() > 0) {
    let entry = priorityQueue.pop().val;
    printer.print(entry.logEntry);
    addToQueue(priorityQueue, entry.idx, logSources);
  }
  printer.done();
};

function addToQueue(queue, idx, sources) {
  let logEntry = sources[idx].pop();
  if (logEntry !== false) {
    queue.insert({ logEntry, idx }, logEntry.date);
  }
}
