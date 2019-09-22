function sliceArray(anim, beginSlice, endSlice) {
    // Add your code below this line

    return anim.slice(beginSlice, endSlice)
    var newArray = []
    for (let i in anim) {
        if (i >= beginSlice && i < endSlice) {
            newArray.push(anim[i])
        }
    }
    return newArray

    // Add your code above this line
}
var inputAnim = ["Cat", "Dog", "Tiger", "Zebra", "Ant"];
sliceArray(inputAnim, 1, 3);