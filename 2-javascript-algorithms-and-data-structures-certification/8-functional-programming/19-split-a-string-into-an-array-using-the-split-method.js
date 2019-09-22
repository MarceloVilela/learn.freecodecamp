function splitify(str) {
    // Add your code below this line

    return str.split(/[^a-zA-Z\d\s:]/).join(' ').split(' ')

    // Add your code above this line
}
splitify("Hello World,I-am code");