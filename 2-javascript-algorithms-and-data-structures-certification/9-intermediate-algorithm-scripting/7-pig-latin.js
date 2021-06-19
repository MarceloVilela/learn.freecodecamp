function translatePigLatin(str) {
    let result = '';

    const beginsVogal = /^(a|e|i|o|u)(\w+)/;
    const regexpConsoant = /^(b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z)(\w+)/;
    const regexpConsoantTwo = /^(b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z)(b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z)(\w+)/;
    const containsVogal = /a|e|i|o|u/;
    const vogalInMiddle = /(\w+)(a|e|i|o|u)(\w+)/;

    if (str.match(beginsVogal)) {
        result = str.replace(beginsVogal, "$1$2way");
    }

    if (!str.match(containsVogal) && !result) {
        result = `${str}ay`;
    }

    if (str.match(containsVogal) && !result) {
        if (!str.match(vogalInMiddle)[1].match(containsVogal)) {
            result = str.replace(vogalInMiddle, "$2$3$1ay");
        }
    }

    if (str.match(regexpConsoantTwo) && !result) {
        result = str.replace(regexpConsoantTwo, "$3$1$2ay");
    }

    if (str.match(regexpConsoant) && !result) {
        result = str.replace(regexpConsoant, "$2$1ay");
    }

    return result;
}

console.log(translatePigLatin("consonant"));