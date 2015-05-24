// Dependencies
var Pie = require("../lib");

// Generate a new pie, with radius 5 characters
var p = new Pie(5, [
    { label: "Water", value: 70, color: [ 0, 0, 255] }
  , { label: "Land", value: 30, color: [255, 240, 0] }
], {
    legend: true
});

// Stringify
console.log(p.toString());

// Stringify, after disabling the ansi styles
p.options.no_ansi = true;
console.log(p.toString());

// Add a new item
p.add({
    label: "Test"
  , value: 20
});

// Enable the ansi styles
p.options.no_ansi = false;
console.log(p.toString());

// Disable the ansi styles and reset colors
p.options.no_ansi = true;
p.colors = {};
console.log(p.toString());
