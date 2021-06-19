function getIndexToIns(arr, num) {
    var lastIndexOf = arr
        .sort((a, b) => a - b)
        .map(value => value >= num).indexOf(true);

    var result = lastIndexOf > -1
        ? lastIndexOf
        : arr.length;

    return result;
}

getIndexToIns([40, 60], 50);
