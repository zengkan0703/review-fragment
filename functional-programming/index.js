// https://zh.javascript.info/currying-partials
var fn = curry(function(a, b, c) {
  console.log([a, b, c]);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]

function curry(fn) {
  return function curried(...args) {
    if (args.length < fn.length) {
      return function(...other) {
        return curried.call(this, ...args, ...other);
      }
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