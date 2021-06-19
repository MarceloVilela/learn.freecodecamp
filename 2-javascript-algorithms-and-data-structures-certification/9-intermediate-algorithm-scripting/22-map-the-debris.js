function orbitalPeriod(arr) {
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
    var a = 2 * Math.PI;

    function calc(avgAlt) {
        var c = Math.pow(earthRadius + avgAlt, 3);
        var b = Math.sqrt(c / GM);
        var orbPeriod = Math.round(a * b);
        return orbPeriod;
    }

    return arr.map(({ name, avgAlt }) => ({
        name,
        orbitalPeriod: calc(avgAlt)
    }));
}

console.log(orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }]));