function countOnline(usersObj) {
    // Only change code below this line
    let counter = 0;
    for (let user in usersObj) {
        counter += usersObj[user].online ? 1 : 0;
    }
    return counter;
    // Only change code above this line
}
