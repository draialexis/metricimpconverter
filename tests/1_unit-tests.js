const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('convertHandler should correctly read a whole number input', function() {
    let input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    let input = '3.2mi';
    assert.equal(convertHandler.getNum(input), 3.2);
  });

  test('convertHandler should correctly read a fractional input', function() {
    let input = '1/2km';
    assert.equal(convertHandler.getNum(input), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    let input = '5.4/3lbs';
    assert.equal(convertHandler.getNum(input), 1.8);
  });

  test('convertHandler should correctly return an error on a double-fraction', function() {
    let input = '3/2/3km';
    assert.throws(() => convertHandler.getNum(input), Error, 'Invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided',
      function() {
        let input = 'kg';
        assert.equal(convertHandler.getNum(input), 1);
      });

  test('convertHandler should correctly read each valid input unit', function() {
    let input = '32gAl';
    assert.equal(convertHandler.getUnit(input), 'gal');
  });

  test('convertHandler should correctly return an error for an invalid input unit', function() {
    let input = '32gallons';
    assert.throws(() => convertHandler.getUnit(input), Error, 'Invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    let input = 'gal';
    assert.equal(convertHandler.spellOutUnit(input), 'gallons');
  });

  test('convertHandler should correctly convert gal to L', function() {
    let expected = 18.92705; // 5 * 3.78541
    assert.approximately(convertHandler.convert(5, 'gal'), expected, 0.1);
  });

  test('convertHandler should correctly convert L to gal', function() {
    let expected = 1.32086; // 5 / 3.78541
    assert.approximately(convertHandler.convert(5, 'L'), expected, 0.1);
  });

  test('convertHandler should correctly convert mi to km', function() {
    let expected = 8.0467; // 5 * 1.60934
    assert.approximately(convertHandler.convert(5, 'mi'), expected, 0.1);
  });

  test('convertHandler should correctly convert km to mi', function() {
    let expected = 3.10686; // 5 / 1.60934
    assert.approximately(convertHandler.convert(5, 'km'), expected, 0.1);
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    let expected = 2.26796; // 5 * 0.453592
    assert.approximately(convertHandler.convert(5, 'lbs'), expected, 0.1);
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    let expected = 11.0231; // 5 / 0.453592
    assert.approximately(convertHandler.convert(5, 'kg'), expected, 0.1);
  });
});
