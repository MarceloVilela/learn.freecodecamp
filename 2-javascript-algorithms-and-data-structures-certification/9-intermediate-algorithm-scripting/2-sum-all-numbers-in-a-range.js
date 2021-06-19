function sumAll(arr) {
    const [min, max] = arr.sort((a, b) => a - b);
    let sum = 0;

    for (let i = min; i <= max; i++) {
        sum += i;
    }

    return sum;
}

sumAll([1, 4]);