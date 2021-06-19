function factorialize(num) {
    var fact = 1;

    for (var i = 1; i < num; i++) {
        fact *= (i + 1);
    }

    return fact;
}

factorialize(5);
