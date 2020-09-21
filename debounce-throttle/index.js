// 防抖
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

// 节流
function throttle(func, time) {
  let start = 0;
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    const now = Date.now();
    if (now - start >= time) {
      func.apply(this, args);
      start = now;
    } else {
      // 离开之后再调用一次
      timer = setTimeout(function() {
        func.apply(this, args);
        timer = null;
      }, time)
    }
  }
}