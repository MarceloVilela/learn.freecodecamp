const unitAmount = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

function checkCashRegister(price, cash, cid) {
  let res = { status: '', change: [] }
  let updatedCidObj = {}
  let updatedChange = cash - price

  cid.reverse().forEach(item => {
    const [unit, value] = item;
    const getAmountByUnit = unitKey => unitAmount[unitKey]

    let tempResAmount = Math.floor(updatedChange / unitAmount[unit])
    let currentAmount = Math.round(value / unitAmount[unit])

    let resAmount = currentAmount <= tempResAmount ? currentAmount : tempResAmount;
    let resAmountValue = resAmount * unitAmount[unit]

    updatedCidObj[unit] = parseFloat((value - resAmountValue).toFixed(2))

    // Only push to res.change array if there is really an amount (>0)
    if (resAmount > 0) {
      res.change.push([unit, resAmountValue])
      updatedChange = parseFloat((updatedChange - resAmountValue).toFixed(2))
    }
  });

  //Analyze and make the final decision for status and change
  if (updatedChange > 0) {
    res = { status: "INSUFFICIENT_FUNDS", change: [] }
  }
  else if (Object.keys(updatedCidObj).every(unit => 0 === updatedCidObj[unit])) {
    // All units have 0 amount in updatedCidObj
    // That means no more money in drawer
    res = { status: 'CLOSED', change: cid.reverse() }
  }
  else {
    res.status = 'OPEN'
  }

  console.log(res);

  return res;
}

checkCashRegister(
  19.5,
  20,
  [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100
    ]
  ]);

//checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
