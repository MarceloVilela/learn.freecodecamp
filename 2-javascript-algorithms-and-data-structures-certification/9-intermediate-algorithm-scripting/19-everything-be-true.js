function truthCheck(collection, pre) {
    return collection
        .filter(item => !!item[pre])
        .length === collection.length;
}

truthCheck([{ "user": "Tinky-Winky", "sex": "male" }, { "user": "Dipsy", "sex": "male" }, { "user": "Laa-Laa", "sex": "female" }, { "user": "Po", "sex": "female" }], "sex");
