function fearNotLetter(str) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    return alphabet
        .slice(alphabet.indexOf(str.charAt()))
        .split("")
        .filter(item => str.indexOf(item) === -1)[0];
}

fearNotLetter("abce");