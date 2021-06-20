/*
*
*
*       Complete the handler logic below
*
*
*/

function ConvertHandler() {

  this.getNum = function (input) {
    if (input.split('').filter(char => char === '/').length > 1) {
      return ['', ''];
    }

    var noNumber = input.match(/\d{1,}/) === null;
    if (noNumber) {
      return ['1', 1];
    }

    var result = input.match(/(\d{1,}\.\d{1,}\/\d{1,})|(\d{1,}(\.|\/)?(\d{1,}(\.)?(\d{1,})?)?)/)

    if (result === null) {
      return ['', ''];
    }

    result = result[0];
    var resultFormatted = null;

    if (result.indexOf('/') > -1) {
      resultFormatted = Number(result.split('/')[0]) / Number(result.split('/')[1]);
    }

    return [result, Number(resultFormatted ? resultFormatted : result)];
  };

  this.getUnit = function (input) {
    var match = input.match(/[a-zA-Z]{1,}/);

    if (match === null) {
      return '';
    }

    var result = match[0];

    var unitsAvailable = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];

    if (!unitsAvailable.includes(result)) {
      return '';
    }

    return result.toLowerCase();
  };

  this.getReturnUnit = function (initUnit) {
    initUnit = initUnit.toLowerCase();

    var convertImp = {
      'gal': 'l',
      'lbs': 'kg',
      'mi': 'km'
    };

    var convertMet = {
      'l': 'gal',
      'kg': 'lbs',
      'km': 'mi'
    };

    if (convertImp[initUnit]) {
      return convertImp[initUnit];
    }
    else if (convertMet[initUnit]) {
      return convertMet[initUnit];
    }

    return '';
  };

  this.spellOutUnit = function (unit) {
    unit = unit.toLowerCase();

    var convert = {
      'gal': 'gallon',
      'lbs': 'pound',
      'mi': 'mile',
      'l': 'liter',
      'kg': 'kilogram',
      'km': 'kilometer'
    };

    var result = convert[unit];

    return result;
  };

  this.convert = function (initNum, initUnit) {
    initUnit = initUnit.toLowerCase();

    var galToL = 3.78541;
    var lbsToKg = 0.453592;
    var miToKm = 1.60934;

    var imp = ['gal', 'lbs', 'mi'];

    var diffUnit = {
      'gal': galToL,
      'l': galToL,
      'lbs': lbsToKg,
      'kg': lbsToKg,
      'mi': miToKm,
      'km': miToKm
    };

    if (!Object.keys(diffUnit).includes(initUnit)) {
      return 0;
    }

    var result = imp.includes(initUnit)
      ? initNum * diffUnit[initUnit]
      : initNum / diffUnit[initUnit];

    var resultFormatted = Number(Number(result).toFixed(5));

    return resultFormatted;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    var result = `${initNum} ${this.spellOutUnit(initUnit)}s converts to ${returnNum} ${this.spellOutUnit(returnUnit)}s`;

    return result;
  };
}

module.exports = ConvertHandler;
