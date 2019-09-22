function sentensify(str) {
    // Add your code below this line

    return str.split(/[^a-zA-Z\d\s:]/)
        .join(' ')
        //.split(' ')  

    // Add your code above this line
}
sentensify("May-the-force-be-with-you");