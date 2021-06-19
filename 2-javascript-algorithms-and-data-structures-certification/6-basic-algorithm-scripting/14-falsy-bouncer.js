function bouncer(arr) {
    return arr.filter(item => !!item !== false);
}

bouncer([7, "ate", "", false, 9]);
