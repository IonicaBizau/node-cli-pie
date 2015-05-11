var Pie = require("../lib");

var p = new Pie(30, [
    { name: "Water", value: 70, color: "#3498db" }
  , { name: "Land", value: 30, color: "#f1c40f" }
], {
    legend: true
});

console.log(p.toString());
