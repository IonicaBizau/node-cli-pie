var Pie = require("../lib");

var p = new Pie(5, [
    { label: "Water", value: 70, color: [ 0, 0, 255] }
  , { label: "Land", value: 30, color: [255, 240, 0] }
], {
    legend: true
});

console.log(p.toString());
