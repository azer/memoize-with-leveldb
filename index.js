var debug = require("debug")('memoize-with-leveldb');
var memoize = require("memoize-async");
var fncounter = 1;
var io;

module.exports = setup;

function setup (path) {
  io = require("level-json-cache")(path || './data-memoization');
  return mlevel;
}

function mlevel (fn, options) {
  var prefix = (options && options.name || getFunctionId(fn)) + '#' + fncounter++ + ':';
  var time;

  if (typeof options == 'string') {
    time = options;
  } else {
    time = options.time;
  }

  return memoize(fn, {
    hash: options && options.hash,
    read: read,
    write: write
  });

  function read (key, callback) {
    debug('Reading %s', key);

    io.get(prefix + key, function (error, value) {
      if (error || error || typeof value == 'undefined') return callback(true);
      callback(undefined, value);
    });
  }

  function write (key, value, callback) {
    debug('Writing %s', key);

    var record = { length: value.length };
    var i = value.length;
    while (i--) {
      record[i] = value[i];
    }

    io.set(prefix + key, record, time, callback);
  }
}

function getFunctionId (fn) {
  return (fn.name || 'func');
}
