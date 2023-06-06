"use strict";
const MinHeap = require("./minheap");

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  let priorityQueue = new MinHeap();

  for (let i in logSources) {
    addToQueue(priorityQueue, i, logSources);
  }

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
