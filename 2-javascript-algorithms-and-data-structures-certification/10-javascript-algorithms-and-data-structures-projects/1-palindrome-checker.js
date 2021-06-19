function palindrome(str) {
  const strAlphaNumeric = str
    .split('')
    .filter(char => /[a-zA-Z]|[0-9]/.test(char))
    .join('')
    .toLowerCase();

  const strAlphaNumericReversed = strAlphaNumeric.split('').reverse().join('');

  // Debug
  // console.log(str, '=>', strAlphaNumeric, '=>', strAlphaNumericReversed)

  return strAlphaNumeric === strAlphaNumericReversed;
}

palindrome("eye");
