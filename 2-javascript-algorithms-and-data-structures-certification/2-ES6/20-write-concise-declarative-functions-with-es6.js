// change code below this line
const bicycle = {
    gear: 2,
    //setGear: f_unction(newGear) {
    setGear(newGear) {
        "use strict";
        this.gear = newGear;
    }
};
// change code above this line
bicycle.setGear(3);
console.log(bicycle.gear);