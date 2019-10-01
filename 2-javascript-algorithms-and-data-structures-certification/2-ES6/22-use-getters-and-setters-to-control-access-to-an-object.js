//function makeClass() {
const makeClass = (temp) => {
    "use strict";
    /* Alter code below this line */
    class Thermostat {
        constructor(temp) {
            this._temperature = temp
        }

        get temperature() {
            //return this._temperature
            return 5 / 9 * (this._temperature - 32)
        }

        set temperature(temp) {
            this._temperature = temp
        }
    }
    /* Alter code above this line */
    return Thermostat;
}
const Thermostat = makeClass();
const thermos = new Thermostat(76); // setting in Fahrenheit scale
let temp = thermos.temperature; // 24.44 in C
thermos.temperature = 26;
temp = thermos.temperature; // 26 in C