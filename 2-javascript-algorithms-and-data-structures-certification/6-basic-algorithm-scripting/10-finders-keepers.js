function findElement(arr, func) {
    let num = undefined;

    let find = arr.filter(element => func(element));

    num = find.length > 0 ? find[0] : num;

    return num;
}

findElement([1, 2, 3, 4], num => num % 2 === 0);
