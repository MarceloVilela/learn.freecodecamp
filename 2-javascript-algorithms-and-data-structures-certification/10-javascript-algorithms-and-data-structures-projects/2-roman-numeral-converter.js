const unitToRoman = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX' };
const dozensToRoman = { 1: 'X', 2: 'XX', 3: 'XXX', 4: 'XL', 5: 'L', 6: 'LX', 7: 'LXX', 8: 'LXXX', 9: 'XC' };
const hundredsToRoman = { 1: 'C', 2: 'CC', 3: 'CCC', 4: 'CD', 5: 'D', 6: 'DC', 7: 'DCC', 8: 'DCCC', 9: 'CM' };
const thousandsToRoman = { 1: 'M', 2: 'MM', 3: 'MMM', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX' };

function convertToRoman(num) {
  const str = String(num);

  const unit = unitToRoman[str[str.length - 1]];
  const dozens = dozensToRoman[str[str.length - 2]];
  const hundreds = hundredsToRoman[str[str.length - 3]];
  const thousands = thousandsToRoman[str[str.length - 4]];

  const result = [thousands, hundreds, dozens, unit].join('');

  // Debug
  //console.log(num, result);

  return result;
}

convertToRoman(36);
