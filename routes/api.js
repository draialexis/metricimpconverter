// routes/api.js

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  const convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    try {
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);

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
