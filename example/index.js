var Pie = require("../lib");

var p = new Pie(30, [
    { name: "Water", value: 70 }
  , { name: "Land", value: 30 }
  , { name: "Land", value: 50 }
  , { name: "Land", value: 10 }
], {
    legend: true
});

console.log(p.toString());
