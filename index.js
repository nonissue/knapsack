const knapsack = require("./knapsack");

const marks = [
  { w: 5, v: 40 },
  { w: 2, v: 10 },
  { w: 2, v: 20 },
  { w: 2, v: 100 },
  { w: 3, v: 5 },
  { w: 3, v: 50 },
  { w: 5, v: 99 },
  { w: 11, v: 50 }
];

const test = knapsack(marks, 5);
const test2 = knapsack(marks, 4);

const test3 = knapsack(marks, 6);
