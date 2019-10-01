//const increment = (f_unction() {
const increment = (() => {
    "use strict";
    //return function increment(number, value) {
    return function increment(number, value = 1) {
        return number + value;
    };
})();
console.log(increment(5, 2)); // returns 7
console.log(increment(5)); // returns 6