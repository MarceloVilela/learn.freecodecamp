function checkScope() {
    "use strict";
      let i = "function scope";
      if (i!=="function scope") {
        i = "block scope";
        console.log("Block scope i is: ", i);
      }
      console.log("Function scope i is: ", i);
      return i;
    }