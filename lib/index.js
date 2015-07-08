// Dependencies
var Ul = require("ul")
  , FlatColors = require("flatcolors")
  , CliCircle = require("cli-circle")
  , Couleurs = require("couleurs")
  ;

/**
 * CliPie
 * Creates a new instance of `CliPie`.
 *
 * @name CliPie
 * @function
 * @param {Number} r The radius value.
 * @param {Array} data An array of objects in the following format:
 * @param {Object} options An object containing the following fields:
 *
 *  - `flat` (Boolean): If `true`, flat colors will be used (default: `true`).
 *  - `chr` (String): The character to draw the pie (default: `" "`).
 *  - `no_ansi` (Boolean): If `true`, ansi styles will not be used.
 *  - `circle_opts` (Object): The options passed to the
 *    [`cli-circle`](https://github.com/IonicaBizau/node-cli-circle) module,
 *    which uses the
 *    [`cli-graph`](https://github.com/IonicaBizau/node-cli-graph) module to
 *    build the graph.
 *
 * @return {CliPie} The `CliPie` instance.
 */
function CliPie(r, data, options) {
    this.data = [];
    this.radius = r;
    this.total = 0;
    this.colors = {};
    this.cChar = -1;
    this.options = Ul.deepMerge(options, {
        flat: true
      , chr: " "
      , no_ansi: false
      , circle_opts: {
            aRatio: 1
        }
      , chars: "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    });
    if (Array.isArray(data)) {
        data.forEach(this.add.bind(this));
    } else if (data && data.constructor === Object) {
        options = data;
    }
}

/**
 * CliPie.Item
 * Creates a new `CliPie.Item` instance.
 *
 * @name CLiPie.Item
 * @function
 * @param {Object} obj The `CliPie.Item` data containing:
 *
 *  - `value` (Number): The item value.
 *  - `label` (String): The item label.
 *  - `color` (String): The item color (used in ansi graphs).
 *  - `letter` (String): The item letter (used on non-ansi graphs).
 *
 * @return {CliPieItem} The `CliPieItem` containing:
 */
CliPie.Item = function (obj) {
    this.value = obj.value;
    this.label = obj.label;
    this.color = obj.color;
    this.percent = null;
    this.angle = null;
    this.letter = obj.letter;
};

/**
 * add
 * Adds new items in the cli pie.
 *
 * @name add
 * @function
 * @param {Object} item The item data.
 * @return {CliPie} The `CliPie` instance.
 */
CliPie.prototype.add = function (item) {
    item.letter = item.letter || this.options.chars[++this.cChar];
    var nItem = new CliPie.Item(item);
    this.total += nItem.value;
    this.data.push(nItem);
    return this;
};

/**
 * textColor
 * Adds foreground or/and background color(s) to the provided text.
 *
 * @name textColor
 * @function
 * @param {String} text The text to color.
 * @param {String} color The color value.
 * @param {Boolean} fg If `true`, the function will modify the foreground
 * color of the text (default: `true`).
 * @param {Boolean} bg If `true`, the function will modify the background
 * color of the text.
 * @return {String} The colored text.
 */
CliPie.prototype.textColor = function (text, color, fg, bg) {
    if (color && fg === undefined) {
        fg = true;
    }
    if (this.options.no_ansi || !(fg || bg) || !color) {
        return text;
    }
    if (fg && bg) {
        return Couleurs(text).bg(color).fg(color);
    }

    return Couleurs[fg ? "fg" : "bg"](text, color);
};

/**
 * uniqueColor
 * Generates an unique color.
 *
 * @name uniqueColor
 * @function
 * @param {String} cColor The provided color.
 * @return {String} The unique color.
 */
CliPie.prototype.uniqueColor = function (cColor) {
    var self = this
      , color = null
      , clrStr = null
      ;

    if (self.options.no_ansi) {
        return cColor;
    }

    if (cColor === undefined) {
        color = FlatColors();
    } else if (this.options.flat && FlatColors.colors.indexOf(cColor) === -1 || Array.isArray(cColor) && cColor.length === 3) {
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

/**
 * toString
 * Stringifies the pie.
 *
 * @name toString
 * @function
 * @return {String} The stringified pie.
 */
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

    var i = 0
      , letters = {}
      , cPoint = null
      , str = ""
      , legend = null
      , cLegend = null
      ;

    self.data.forEach(function (cItem) {
        cItem.percent = (100 * cItem.value) / self.total;
        cItem.angle = cItem.percent * 3.6;
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
            return self.textColor(self.options.no_ansi ? c.letter : "⬛", c.color) + " " + c.label + " (" + c.percent.toFixed(2) + "%)";
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
};

module.exports = CliPie;
