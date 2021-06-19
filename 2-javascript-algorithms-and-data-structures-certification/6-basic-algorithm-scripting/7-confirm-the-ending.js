function confirmEnding(str, target) {
    return str.match(new RegExp(target + '$')) !== null;
}

confirmEnding("Bastian", "n");
