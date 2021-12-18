export const debounce = function(func, wait) {
  let startTime = Date.now();
  let timer;

  return (...args) => {
    if (Date.now() - startTime < wait && timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, wait);
    startTime = Date.now();
  }
}