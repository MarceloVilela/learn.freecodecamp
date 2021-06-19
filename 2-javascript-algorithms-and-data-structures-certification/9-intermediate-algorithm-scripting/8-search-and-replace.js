function myReplace(str, before, after) {
    return str.replace(
        new RegExp(before),
        before.split("")[0].charCodeAt() < 'a'.charCodeAt()
            ? after.charAt(0).toUpperCase() + after.slice(1)
            : after.charAt(0).toLowerCase() + after.slice(1)
    );
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");