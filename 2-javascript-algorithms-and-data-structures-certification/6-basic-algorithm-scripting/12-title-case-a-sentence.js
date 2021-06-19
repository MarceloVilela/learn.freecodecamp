function titleCase(str) {
    var unavailable = [
        'of',
        'the'
    ];

    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }

    return str
        .split(' ')
        .map(word => {
            return unavailable.indexOf(word) === -1
                ? capitalize(word)
                : word;
        })
        .join(' ');
}

titleCase("I'm a little tea pot");
