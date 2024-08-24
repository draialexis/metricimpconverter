// controllers/convertHandler.js
const numberRegex = /^[^a-zA-Z]*/;
const validFraction = /^(\d+(\.\d+)?)(\/\d+(\.\d+)?)?$/;

const unitRegex = /[a-zA-Z]+$/;
const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

function ConvertHandler() {
  this.guardInvalidNumberAndUnit = function(input) {
    if (!isNumberValid(input) && !isUnitValid(input)) {
      throw new Error('invalid number and unit');
    }
  };

  const isNumberValid = (x) => (x.match(numberRegex) && validFraction.test(x.match(numberRegex)[0]));
  const isUnitValid = (x) => x.match(unitRegex) && validUnits.includes(x.match(unitRegex)[0]);

  this.getNum = function(input) {

    const numberStr = input.match(numberRegex)[0];

    if (numberStr === '') {
      return 1;
    }

    if (!isNumberValid(input)) {
      throw new Error('invalid number');
    }

    return eval(numberStr);
  };

  this.getUnit = function(input) {
    let unit = input.match(unitRegex)[0];

    unit = normalizeUnit(unit);

    if (!isUnitValid(unit)) {
      throw new Error('invalid unit');
    }

    return unit;
  };

  const normalizeUnit = (unit) => {
    unit = unit.toLowerCase();
    if (unit === 'l') {
      unit = 'L';
    }
    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    const unitPairs = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs',
    };

    return unitPairs[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const unitSpelling = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms',
    };

    return unitSpelling[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        throw new Error('invalid unit');
    }

    return toNthDecimalPlace(result, 1e5);
  };

  const toNthDecimalPlace = (num, n) => Math.round(num * n) / n;

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
