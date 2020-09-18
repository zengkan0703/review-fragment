var fn = curry(function(a, b, c) {
  console.log([a, b, c]);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]

function curry(fn, length = fn.length) {
  return function(...args) {
    if (args.length < length) {
      return curry(
        function(...other) {
          fn.call(this, ...args, ...other);
        },
        length - args.length
      )
    } else {
      return fn.call(this, ...args);
    }
  }
}

function curry2(fn, args = []) {
  return function(...args1) {
    const _args = args.slice(0);
    _args.push(...args1);
    if (_args.length < fn.length) {
      return curry2(
        fn,
        _args
      )
    } else {
      fn.call(this, ..._args);
    }
  }
}