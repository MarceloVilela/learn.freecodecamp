function mutation(arr) {
    var includes = (source, find) => source.toLowerCase().indexOf(
        find.toLowerCase()
    ) > -1;

    var containLetters = arr[1]
        .split('')
        .map(letter => includes(arr[0], letter));

    return containLetters.indexOf(false) === -1;
}

mutation(["hello", "hey"]);
