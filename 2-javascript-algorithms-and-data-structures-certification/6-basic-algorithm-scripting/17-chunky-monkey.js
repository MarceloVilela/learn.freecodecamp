function chunkArrayInGroups(arr, size) {
    var dimensions = Math.ceil(arr.length / size);

    var groups = [];
    for (var i = 0; i < dimensions; i++) {
        groups.push(arr.splice(0, size));
    }

    return groups;
}

chunkArrayInGroups(["a", "b", "c", "d"], 2);
