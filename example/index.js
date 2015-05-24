var Pie = require("../lib");

var p = new Pie(5, [
    { label: "Water", value: 70, color: [ 0, 0, 255] }
  , { label: "Land", value: 30, color: [255, 240, 0] }
], {
    legend: true
});

console.log(p.toString());
p.options.no_ansi = true;

console.log(p.toString());
p.add({
    label: "Test"
  , value: 20
});

console.log(p.toString());
p.options.no_ansi = false;
p.colors = {};

console.log(p.toString());
