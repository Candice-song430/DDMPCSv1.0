export default {
  throttle(fn, delay) {
    let last = 0;
    
    return function() {
      let context = this;
      let args = arguments;
      let now = +new Date();

      if(now - last > delay) {
        fn.apply(context, args);
        last = now;
      }

    }
  }
}