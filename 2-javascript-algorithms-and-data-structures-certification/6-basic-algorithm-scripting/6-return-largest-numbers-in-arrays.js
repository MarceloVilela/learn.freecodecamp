function largestOfFour(arr) {
    function largest(arr) {
        return arr.sort((a, b) => b - a)[0];
    }

    return arr.map(nestedArray => largest(nestedArray));
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
