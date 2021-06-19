function truncateString(str, num) {
    return str.length > num
        ? str
            .split('')
            .splice(0, num)
            .join('')
        + '...'
        : str;
}

truncateString("A-tisket a-tasket A green and yellow basket", 8);
