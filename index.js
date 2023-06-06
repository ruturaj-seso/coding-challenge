"use strict";

const LogSource = require("./lib/log-source");
const Printer = require("./lib/printer");

function runSolutions(sourceCount) {
  return new Promise((resolve, reject) => {
    /**
     * Challenge Number 1!
     *
     * Assume that a LogSource only has one method: pop() which will return a LogEntry.
     *
     * A LogEntry is simply an object of the form:
     * {
     * 		date: Date,
     * 		msg: String,
     * }
     *
     * All LogEntries from a given LogSource are guaranteed to be popped in chronological order.
     * Eventually a LogSource will end and return boolean false.
     *
     * Your job is simple: print the sorted merge of all LogEntries across `n` LogSources.
     *
     * Call `printer.print(logEntry)` to print each entry of the merged output as they are ready.
     * This function will ensure that what you print is in fact in chronological order.
     * Call 'printer.done()' at the end to get a few stats on your solution!
     */
    const syncLogSources = [];
    for (let i = 0; i < sourceCount; i++) {
      syncLogSources.push(new LogSource());
    }
    try {
      require("./solution/sync-sorted-merge")(syncLogSources, new Printer());
      resolve();
    } catch (e) {
      reject(e);
    }
  }).then(() => {
    return new Promise((resolve, reject) => {
      /**
       * Challenge Number 2!
       *
       * Similar to Challenge Number 1, except now you should assume that a LogSource
       * has only one method: popAsync() which returns a promise that resolves with a LogEntry,
       * or boolean false once the LogSource has ended.
       *
       * Your job is simple: print the sorted merge of all LogEntries across `n` LogSources.
       *
       * Call `printer.print(logEntry)` to print each entry of the merged output as they are ready.
       * This function will ensure that what you print is in fact in chronological order.
       * Call 'printer.done()' at the end to get a few stats on your solution!
       */
      const asyncLogSources = [];
      for (let i = 0; i < sourceCount; i++) {
        asyncLogSources.push(new LogSource());
      }
      require("./solution/async-sorted-merge")(asyncLogSources, new Printer())
        .then(resolve)
        .catch(reject);
    });
  });
}

// Adjust this input to see how your solutions perform under various loads.
runSolutions(100);

/* 

Synchronous

runSolutions(100);
***********************************
Logs printed:            23499
Time taken (s):          0.734
Logs/s:                  32014.9863760218
***********************************

runSolutions(1000);
***********************************
Logs printed:            24430
Time taken (s):          1.142
Logs/s:                  21392.294220665503
***********************************

runSolutions(10000);
***********************************
Logs printed:            2391802
Time taken (s):          116.278
Logs/s:                  20569.686441115256
***********************************

*/

/*
Asynchronous

runSolutions(100);
***********************************
Logs printed:            23809
Time taken (s):          2.588
Logs/s:                  9199.768160741885
***********************************

runSolutions(1000);
***********************************
Logs printed:            237039
Time taken (s):          13.623
Logs/s:                  17399.9119136754
***********************************

runSolutions(10000);
***********************************
Logs printed:            2394044
Time taken (s):          145.057
Logs/s:                  16504.16043348477
***********************************
*/
