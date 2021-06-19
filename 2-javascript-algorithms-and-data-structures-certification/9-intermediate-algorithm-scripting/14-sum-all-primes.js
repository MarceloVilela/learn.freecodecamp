function sumPrimes(num) {
    function isPrime(num) {
        let divisors = [];
        for (let i = 1; i <= num; i++) {
            if (num % i === 0) {
                divisors.push(num);
            }
        }
        return divisors.length === 2;
    }

    function primesUntil(num) {
        let primes = [];
        for (let i = 1; i <= num; i++) {
            if (isPrime(i)) {
                primes.push(i);
            }
        }
        return primes;
    }

    return primesUntil(num)
        .reduce((a, b) => a + b);
}

sumPrimes(10);
