var count = 0;

function cc(card) {
  // Only change code below this line
  if ([2, 3, 4, 5, 6].includes(card)) {
    count += 1;
  } else if ([7, 8, 9].includes(card)) {
    count += 0;
  } else if ([10, 'J', 'Q', 'K', 'A'].includes(card)) {
    count += -1;
  }

  if (count > 0) {
    return count + " Bet";
  } else {
    return count + " Hold";
  }
  // Only change code above this line
}

cc(2); cc(3); cc(7); cc('K'); cc('A');
