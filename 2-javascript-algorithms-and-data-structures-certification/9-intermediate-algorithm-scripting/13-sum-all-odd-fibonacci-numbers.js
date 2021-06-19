function sumFibs(num) {
    let fib = [];
    fib[0] = 0;
    fib[1] = 1;

    for (let i = 2; i <= num; i++) {
        fib[i] = fib[i - 2] + fib[i - 1];
    }

    const result = fib
        .filter(a => a <= num && a % 2)
        .reduce((a, b) => a + b);

    return result;
}


sumFibs(4);
