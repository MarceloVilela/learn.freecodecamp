// the global variable
var fixedValue = 4;

function incrementer(val) {
    // Add your code below this line

    return ++val

    // Add your code above this line
}

var newValue = incrementer(fixedValue); // Should equal 5
console.log(fixedValue); // Should print 4