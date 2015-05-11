// Dependencies
var Ul = require("ul")
  , FlatColors = require("flatcolors")
  , CliCircle = require("cli-circle")
  , Couleurs = require("couleurs")()
  ;

function CliPie(r, data, options) {
    this.data = [];
    this.radius = r;
    this.total = 0;
    if (Array.isArray(data)) {
        data.forEach(this.add.bind(this));
    } else if (data && data.constructor === Object) {
        options = data;
    }
    this.options = Ul.merge(options, {
        flat: true
    });
}

CliPie.Item = function (obj) {
    this.value = obj.value;
    this.name = obj.name;
    this.color = obj.color;
    this.percent = null;
    this.angle = null;
};

CliPie.prototype.add = function (item) {
    var nItem = new CliPie.Item(item);
    this.total += nItem.value;
    this.data.push(nItem);
};

CliPie.prototype.toString = function () {
    var self = this
      , circle = new CliCircle(self.radius)
      ;

    function line(x1, y1, x2, y2, chr) {
        circle.graph.setFunctionX(function (x) {
            var y = (x - x1) * (y2 - y1) / (x2 - x1) + y1;
            return y;
        }, x1, x2, chr).setFunctionY(function (y) {
            var x = (y - y1) * (x2 - x1) / (y2 - y1) + x1;
            return x;
        }, y1, y2, chr);
    }

    function toRad(a) {
        return a * (Math.PI / 180);
    }

    var cAngle = 1;
    function next(delta) {
        cAngle -= delta;
        return {
            x: self.radius * Math.cos(toRad(cAngle))
          , y: self.radius * Math.sin(toRad(cAngle))
        };
    }

    var cLetterCode = 96
      , cLetter = ""
      , letters = {}
      , i = 0
      , cPoint = null
      , cColor = null
      , str = ""
      ;

    self.data.forEach(function (cItem) {
        cItem.percent = (100 * cItem.value) / self.total;
        cItem.angle = cItem.percent * 3.6;
        ++cLetterCode;
        for (i = 0; i < cItem.angle; ++i) {
            cPoint = next(1);
            cColor = letters[cLetter = String.fromCharCode(cLetterCode)] = cItem.color || FlatColors();
            if (self.options.flat) {
                cColor = letters[cLetter] = FlatColors(cColor);
            }
            line(0, 0, cPoint.x, cPoint.y, cLetter);
        }
    });

    str = circle.toString();
    Object.keys(letters).forEach(function (c) {
        str = str.replace(new RegExp(c, "g"), Couleurs.bg(Couleurs.fg(c, letters[c]), letters[c]));
    });

    return str;
};

module.exports = CliPie;
