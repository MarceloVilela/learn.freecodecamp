function steamrollArray(arr) {
    let result = [];

    function extract(item) {
        if (typeof item !== "object") {
            result.push(item);
            return;
        }

        if (typeof item.map !== "function") {
            result.push({});
            return;
        }

        return item.map(sub => extract(sub));
    }

    arr.forEach(item => extract(item));
    return result;
}

steamrollArray([1, [2], [3, [[4]]]]);