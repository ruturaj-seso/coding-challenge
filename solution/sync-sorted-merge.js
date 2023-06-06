"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  let priorityQueue = [];

  for (let i in logSources) {
    addToQueue(priorityQueue, i, logSources);
  }
  sortQueue(priorityQueue);

  while (priorityQueue.length > 0) {
    printer.print(priorityQueue[0].logEntry);
    addToQueue(priorityQueue, priorityQueue[0].idx, logSources);
    priorityQueue.shift();
    sortQueue(priorityQueue);
  }
  printer.done();
};

function addToQueue(queue, idx, sources) {
  let logEntry = sources[idx].pop();
  if (logEntry !== false) {
    queue.push({ logEntry, idx });
  }
}

function sortQueue(queue) {
  queue.sort((a, b) => {
    if (a.logEntry.date > b.logEntry.date) {
      return 1;
    } else if (a.logEntry.date < b.logEntry.date) {
      return -1;
    }
    return 0;
  });
}
