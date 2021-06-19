function dropElements(arr, func) {
    const result = arr.filter((item, key) =>
        func(item) || (!func(item) && arr.indexOf(item) !== key)
    );

    return result;
}

dropElements([1, 2, 3], function (n) { return n < 3; });
