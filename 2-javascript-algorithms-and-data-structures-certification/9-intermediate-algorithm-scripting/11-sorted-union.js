function uniteUnique(arr) {
    const arrMult = Object.values(arguments);

    let uniques = [];

    arrMult.forEach(arrNested => {
        arrNested.forEach(item => {
            if (!uniques.includes(item)) {
                uniques.push(item);
            }
        })
    });

    return uniques;
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
