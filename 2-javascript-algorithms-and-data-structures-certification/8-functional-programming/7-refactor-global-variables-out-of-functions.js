// the global variable
var bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica", "Disquisitiones Arithmeticae"];

/* This function should add a book to the list and return the list */
// New parameters should come before the bookName one

// Add your code below this line
function add(list, bookName) {

    return list.concat(bookName)
    //return bookList.push(bookName);

    // Add your code above this line
}

/* This function should remove a book from the list and return the list */
// New parameters should come before the bookName one

// Add your code below this line
function remove(bookList, bookName) {
    var _bookList = [...bookList]
    if (_bookList.indexOf(bookName) >= 0) {
        _bookList.splice(bookList.indexOf(bookName), 1)
        return _bookList
        //return bookList.splice(0, 1, bookName);
    }
    return _bookList
}
// Add your code above this line

var newBookList = add(bookList, 'A Brief History of Time');
var newerBookList = remove(bookList, 'On The Electrodynamics of Moving Bodies');
var newestBookList = remove(add(bookList, 'A Brief History of Time'), 'On The Electrodynamics of Moving Bodies');

//console.log(bookList);