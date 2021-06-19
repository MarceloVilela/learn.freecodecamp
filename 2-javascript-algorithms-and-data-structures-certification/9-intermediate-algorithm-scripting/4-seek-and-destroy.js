function destroyer(arr) {
    const [_, ...arrToDestroy] = Object.values(arguments);
    return arr.filter(item => arrToDestroy.indexOf(item) === -1);
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);