var CliPie = require("../lib")
  , Assert = require("assert")
  ;

it("should create and stringify the pie", function (cb) {
    var p = new CliPie(5, [
        { label: "Water", value: 70, color: [ 0, 0, 255] }
      , { label: "Land", value: 30, color: [255, 240, 0] }
    ], {
        legend: true
    });

    p.toString();
    p.options.no_ansi = true;
    p.toString();
    cb();
});
