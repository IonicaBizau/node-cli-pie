// Dependencies
var Ul = require("ul")
  , FlatColors = require("flatcolors")
  , CliCircle = require("cli-circle")
  , Couleurs = require("couleurs")()
  , Overlap = require("overlap")
  ;

function CliPie(r, data, options) {
    this.data = [];
    this.radius = r;
    this.total = 0;
    this.colors = {};
    if (Array.isArray(data)) {
        data.forEach(this.add.bind(this));
    } else if (data && data.constructor === Object) {
        options = data;
    }
    this.options = Ul.merge(options, {
        flat: true
      , chr: " "
      , no_ansi: false
      , circle_opts: {
            aRatio: 1
        }
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

CliPie.prototype.textColor = function (text, color, fg, bg) {
    if (color && fg === undefined) {
        fg = true;
    }
    if (this.options.no_ansi || !(fg || bg) || !color) {
        return text;
    }
    if (fg && bg) {
        return Couleurs.bg(Couleurs.fg(text, color), color);
    }

    return Couleurs[fg ? "fg" : "bg"](text, color);
};

CliPie.prototype.uniqueColor = function (cColor) {
    var color = null
      , clrStr = null
      ;

    if (cColor === undefined) {
        color = FlatColors();
    } else if (this.options.flat && FlatColors.colors.indexOf(cColor) === -1) {
        color = FlatColors(cColor);
    } else {
        color = FlatColors.toRgb(cColor);
    }

    clrStr = color.join(",");
    if (this.colors[clrStr] && Object.keys(this.colors).length !== FlatColors.colors.length) {
        return this.uniqueColor();
    }

    this.colors[clrStr] = color;
    return color;
};

CliPie.prototype.toString = function () {
    var self = this
      , circle = new CliCircle(self.radius, self.options.chr, self.options.circle_opts)
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

    var cAngle = 90;
    function next(delta) {
        cAngle -= delta;
        return {
            x: self.radius * Math.cos(toRad(cAngle))
          , y: self.radius * Math.sin(toRad(cAngle))
        };
    }

    var cLetterCode = 96
      , letters = {}
      , i = 0
      , cPoint = null
      , str = ""
      , legend = null
      , cLegend = null
      ;

    self.data.forEach(function (cItem) {
        cItem.percent = (100 * cItem.value) / self.total;
        cItem.angle = cItem.percent * 3.6;
        ++cLetterCode;
        cItem.letter = String.fromCharCode(cLetterCode);
        cItem.color = letters[cItem.letter] = self.uniqueColor(cItem.color);
        for (i = 0; i <= cItem.angle; ++i) {
            cPoint = next(1);
            line(0, 0, cPoint.x, cPoint.y, cItem.letter);
        }
    });

    str = circle.toString().split("\n").map(function (c) {
        return c.split("").map(function (ch) {
            return new Array(self.options.circle_opts.aRatio + 2).join(ch);
        }).join("");
    }).join("\n");

    Object.keys(letters).forEach(function (c) {
        str = str.replace(new RegExp(c, "g"), self.textColor(c, letters[c], true, true));
    });

    if (self.options.legend) {
        legend = self.data.map(function (c) {
            return self.textColor("⬛", c.color) + " " + c.name + " (" + c.percent.toFixed(2) + "%)";
        });
        str = str.split("\n");
        str = str.map(function (c, i) {
            cLegend = legend[Math.round(i - str.length / 2 + self.data.length / 2)]
            if (cLegend) {
                return c + " " + cLegend;
            }
            return c;
        }).join("\n");
    }

    return str;
}

module.exports = CliPie;
