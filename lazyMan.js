/*
要求设计 LazyMan 类，实现以下功能
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
*/

class LazyManClass {
  constructor(name) {
    this.taskList = [];
    this.runTimer = null;
    console.log(`Hi I am ${name}`);
  }
  eat(sth) {
    clearTimeout(this.runTimer);
    this.taskList.push(() => {
      console.log(`I am eatin ${sth}`)
      this.next();
    });
    this.run();
    return this;
  }
  sleep(time) {
    clearTimeout(this.runTimer);
    this.taskList.push(() => {
      // console.log(`开始 sleep ${time}秒`);
      setTimeout(() => {
        // console.log(`sleep ${time}秒结束`);
        this.next();
      }, time * 1000)
    })
    this.run();
    return this;
  }
  sleepFirst(time) {
    clearTimeout(this.runTimer);
    this.taskList.unshift(() => {
      // console.log(`开始 sleepFirst ${time}秒`);
      setTimeout(() => {
        // console.log(`sleepFirst ${time}秒结束`);
        this.next();
      }, time * 1000)
    })
    this.run();
    return this;
  }
  next() {
    if (this.taskList.length) {
      this.taskList.shift()();
    } else {
      console.log("执行完成")
    }
  }
  run() {
    this.runTimer = setTimeout(() => {
      this.next();
    })
  }
}

function LazyMan(name) {
  return new LazyManClass(name);
}