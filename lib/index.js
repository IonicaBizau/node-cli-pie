// Dependencies
var Ul = require("ul")
  , FlatColors = require("flatcolors")
  , CliCircle = require("cli-circle")
  ;

function CliPie(w, h, data, options) {
    this.data = [];
    this.height = h;
    this.width = w;
    this.total = 0;
    if (Array.isArray(data)) {
        data.forEach(this.add.bind(this));
    } else if (data && data.constructor === Object) {
        options = data;
    }
}

CliPie.Item = function (obj) {
    this.value = obj.value;
    this.name = obj.name;
    this.color = obj.color;
    this.percent = null;
};

CliPie.prototype.add = function (item) {
    var nItem = new CliPie.Item(item);
    this.total += nItem.value;
    this.data.push(nItem);
};

CliPie.prototype.toString = function () {
    var self = this
      , circle = new CliCircle(self.height)
      ;

    function line(x1, y1, x2, y2) {
        circle.graph.setFunctionX(function (x) {
            return (x - x1) * (y2 - y1) / (x2 - x1) + y1;
        }, x1, x2).setFunctionY(function (y) {
            return (y - y1) * (x2 - x1) / (y2 - y1) + x1;
        }, y1, y2);
    }

    self.data.forEach(function (cItem) {
        cItem.percent = (100 * cItem.value) / self.total;
    });

    line(0, 0, self.height / 10, 0);
    line(0, 0, 0, self.height / 10);
    line(0, 0, 0, -self.height / 10);

    return circle.toString();
};

module.exports = CliPie;
