function addTogether(a, b = undefined) {
    function validateArgs(a, b) {
        if (
            (a && typeof a !== 'number') ||
            (b && typeof b !== 'number')
        ) {
            return false;
        }
        return true;
    }

    if (!validateArgs(a, b)) {
        return undefined;
    }

    if (a && b) {
        return a + b;
    }

    return function (increment) {
        if (!validateArgs(a, increment)) {
            return undefined;
        }

        return a + increment;
    };
}

addTogether(2, 3);
