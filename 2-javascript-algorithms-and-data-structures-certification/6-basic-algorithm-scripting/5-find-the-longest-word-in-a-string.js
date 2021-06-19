function findLongestWordLength(str) {
    return str
        .split(' ')
        .map(word => word.length)
        .sort((a, b) => a - b)
        .reverse()[0];
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");
