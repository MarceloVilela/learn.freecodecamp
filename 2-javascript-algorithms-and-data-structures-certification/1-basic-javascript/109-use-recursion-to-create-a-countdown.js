// Only change code below this line
function countdown(n) {
  if (n < 1) {
    return [];
  } else {
    const countArray = countdown(n - 1);
    countArray.unshift(n);
    return countArray;
  }
}
// Only change code above this line

console.log(-1, countdown(-1));
console.log(10, countdown(10));
console.log(5, countdown(5));
