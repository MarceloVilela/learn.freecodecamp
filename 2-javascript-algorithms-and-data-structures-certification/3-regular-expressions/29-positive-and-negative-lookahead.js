let sampleWord = "astronaut";
let pwRegex = /(?=[a-zA-Z]{3,})(?=\D*\d{2,})/; // Change this line
let result = pwRegex.test(sampleWord);