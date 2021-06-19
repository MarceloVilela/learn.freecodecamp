function whatIsInAName(collection, source) {
    var arr = [];
    // Only change code below this line

    function itemContainsSource(item) {
        var sourceKeys = Object.keys(source);

        return sourceKeys
            .filter((key) => source[key] === item[key])
            .length === sourceKeys.length
    }

    arr = collection
        .filter(item => itemContainsSource(item))
        .slice(0);

    // Only change code above this line
    return arr;
}

whatIsInAName(
    [
        { first: "Romeo", last: "Montague" },
        { first: "Mercutio", last: null },
        { first: "Tybalt", last: "Capulet" }
    ],
    { last: "Capulet" }
);