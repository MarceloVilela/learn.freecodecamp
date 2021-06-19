const lettersAZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const lettersCIPHER = "NOPQRSTUVWXYZABCDEFGHIJKLM".split('');

function rot13(str) {
  let decode = letter => lettersCIPHER[lettersAZ.indexOf(letter)];

  return str
    .split('')
    .map(letter => /\w/.test(letter) ? decode(letter) : letter)
    .join('');
}

console.log("SERR PBQR PNZC", " => ", rot13("SERR PBQR PNZC"));
console.log("SERR CVMMN!", " => ", rot13("SERR CVMMN!"));
console.log("SERR YBIR?", " => ", rot13("SERR YBIR?"));
