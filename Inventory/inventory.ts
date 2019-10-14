import * as util from '../utility'
let val = util.ReadFile('./Inventory.json');

console.log("Cost of Rice: ");
let riceCost = (val[0]['weight'])*(val[0]['price_pr_kg']);
console.log(riceCost);
console.log("Cost of pulses: ");
let pulCost = (val[1]['weight'])*(val[1]['price_pr_kg']);
console.log(pulCost);
console.log("Cost of wheats: ");
let whCost = (val[2]['weight'])*(val[2]['price_pr_kg']);
console.log(whCost);
