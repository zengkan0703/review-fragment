function debounce(func, time, immediate) {
  let timer;
  let firstDone = false;
  function debounced(...args) {
    const context = this;
    clearTimeout(timer);
    if (immediate && !firstDone) {
      func.call(context, ...args)
      firstDone = true;
      setTimeout(() => {
        firstDone = false;
      }, time)
    } else {
      timer = setTimeout(function() {
        func.call(context, ...args)
      }, time)
    }
  }
  debounced.cancel = function() {
    clearTimeout(timer);
    firstDone = false;
  }
  return debounced;
}