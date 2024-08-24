// controllers/convertHandler.js
const numberRegex = /^[^a-zA-Z]*/;
const unitRegex = /[a-zA-Z]+$/;
const validFraction = /^(\d+(\.\d+)?)(\/\d+(\.\d+)?)?$/;
const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

function ConvertHandler() {
  this.getNum = function(input) {
    let result;

    let numberStr = input.match(numberRegex)[0];

    if (numberStr === '') {
      return 1;
    }

    if (!validFraction.test(numberStr)) {
      throw new Error('Invalid number');
    }

    result = eval(numberStr);

    return result;
  };

  this.getUnit = function(input) {
    let result;
    let unit = input.match(unitRegex)[0];

    unit = normalizeUnit(unit);

    if (!validUnits.includes(unit)) {
      throw new Error('Invalid unit');

    }

    result = unit;
    return result;
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
        throw new Error('Invalid unit');
    }

    return Math.round(result * 1e5) / 1e5;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
