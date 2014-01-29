module.exports = {
  now: now,
  nnow: nnow
};

function now (n, callback) {
  setTimeout(function () {

    callback(undefined, +(new Date), n);
  }, 100);
}

function nnow (callback) {
  callback(undefined, Date.now());
}


function fails (callback) {
  callback(new Error('Failed'));
}
