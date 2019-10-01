//const sum = (f_unction() {
const sum = (() => {
    "use strict";
    //return f_unction sum(x, y, z) {
    return function sum(...args) {
        //const args = [ x, y, z ];
        return args.reduce((a, b) => a + b, 0);
    };
})();
console.log(sum(1, 2, 3)); // 6