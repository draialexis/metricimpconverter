// routes/api.js

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = req.query.input;

    try {
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);

      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      });
    } catch (e) {
      if (e.message) {
        res.json({ error: e.message });
      } else {
        res.json({ error: 'Unknown error' });
      }
    }
  });
};
