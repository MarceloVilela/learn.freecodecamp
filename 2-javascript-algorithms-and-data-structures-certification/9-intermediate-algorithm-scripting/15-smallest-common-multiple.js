function smallestCommons(arr) {
  const [min, max] = arr.sort((a, b) => a - b);

  let range = [];
  for(let i=min; i<=max; i++){
    range.push(i);
  }

  const limit = range.reduce((prod, curr) => prod * curr);

  for (let multiple = max; multiple <= limit; multiple += max) {
    const divisible = range
      .filter((value) => multiple % value === 0)
      .length === range.length;

    if (divisible) {
      return multiple;
    }
  }
}

smallestCommons([1, 5]);
