function diffArray(arr1, arr2) {
    var newArr = [];
    newArr = [...arr1.filter(item => arr2.indexOf(item) == -1)];
    return [
        ...newArr,
        ...arr2.filter(item =>
            arr1.indexOf(item) == -1
            && newArr.indexOf(item) == -1
        )
    ];
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);