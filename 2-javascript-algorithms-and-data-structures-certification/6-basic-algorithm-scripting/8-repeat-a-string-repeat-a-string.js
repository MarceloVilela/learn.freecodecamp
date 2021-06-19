function repeatStringNumTimes(str, num) {
    if (isNaN(num) || num < 1) {
        return '';
    }

    var output = '';

    for (var i = 0; i < num; i++) {
        output += str;
    }

    return output;
}

repeatStringNumTimes("abc", 3);
