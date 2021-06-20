'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      function treatBadRequest(isValidNum, isValidUnit) {
        if (!isValidNum && !isValidUnit) {
          return res
            // .status(400)
            .json({ error: 'invalid number and unit' });
        }

        if (!isValidNum) {
          return res
            // .status(400)
            .json({ error: 'invalid number' });
        }

        if (!isValidUnit) {
          return res
            // .status(400)
            .json({ error: 'invalid unit' });
        }
      }

      var input = req.query.input.toLowerCase();
      var [initNumUntouched, initNum] = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      treatBadRequest(!!initNum, !!initUnit);

      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      var initUnitFormatted = initUnit.length === 1 ? initUnit.toUpperCase() : initUnit.toLowerCase();
      var returnUnitFormatted = returnUnit.length === 1 ? returnUnit.toUpperCase() : returnUnit.toLowerCase();

      return res.json({ initNum: initNum, initUnit: initUnitFormatted, returnNum, returnUnit: returnUnitFormatted, string });
    });

};
