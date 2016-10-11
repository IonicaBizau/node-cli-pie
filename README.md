
[![cli-pie](http://i.imgur.com/FcSpq0W.png)](#)

# cli-pie

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Travis](https://img.shields.io/travis/IonicaBizau/node-cli-pie.svg)](https://travis-ci.org/IonicaBizau/node-cli-pie/) [![Version](https://img.shields.io/npm/v/cli-pie.svg)](https://www.npmjs.com/package/cli-pie) [![Downloads](https://img.shields.io/npm/dt/cli-pie.svg)](https://www.npmjs.com/package/cli-pie) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Generate pie charts in terminal and text mode.

[![cli-pie](http://i.imgur.com/6VA7578.png)](#)

## :cloud: Installation

```sh
$ npm i --save cli-pie
```


## :clipboard: Example



```js
// Dependencies
var Pie = require("cli-pie");

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
```

## :memo: Documentation


### `CliPie(r, data, options)`
Creates a new instance of `CliPie`.

#### Params
- **Number** `r`: The radius value.
- **Array** `data`: An array of objects in the following format:
- **Object** `options`: An object containing the following fields:
 - `flat` (Boolean): If `true`, flat colors will be used (default: `true`).
 - `chr` (String): The character to draw the pie (default: `" "`).
 - `no_ansi` (Boolean): If `true`, ansi styles will not be used.
 - `circle_opts` (Object): The options passed to the
   [`cli-circle`](https://github.com/IonicaBizau/node-cli-circle) module,
   which uses the
   [`cli-graph`](https://github.com/IonicaBizau/node-cli-graph) module to
   build the graph.

#### Return
- **CliPie** The `CliPie` instance.

### `CLiPie.Item(obj)`
CliPie.Item
Creates a new `CliPie.Item` instance.

#### Params
- **Object** `obj`: The `CliPie.Item` data containing:
 - `value` (Number): The item value.
 - `label` (String): The item label.
 - `color` (String): The item color (used in ansi graphs).
 - `letter` (String): The item letter (used on non-ansi graphs).

#### Return
- **CliPieItem** The `CliPieItem` containing:

### `add(item)`
Adds new items in the cli pie.

#### Params
- **Object** `item`: The item data.

#### Return
- **CliPie** The `CliPie` instance.

### `textColor(text, color, fg, bg)`
Adds foreground or/and background color(s) to the provided text.

#### Params
- **String** `text`: The text to color.
- **String** `color`: The color value.
- **Boolean** `fg`: If `true`, the function will modify the foreground color of the text (default: `true`).
- **Boolean** `bg`: If `true`, the function will modify the background color of the text.

#### Return
- **String** The colored text.

### `uniqueColor(cColor)`
Generates an unique color.

#### Params
- **String** `cColor`: The provided color.

#### Return
- **String** The unique color.

### `toString()`
Stringifies the pie.

#### Return
- **String** The stringified pie.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`cabdriver`](https://github.com/metaodi/cabdriver) (by Stefan Oderbolz)—Helps you to fill in your hours with taxi
 - [`gh-polyglot`](https://github.com/IonicaBizau/node-gh-polyglot)—Get language stats about GitHub users and repositories.
 - [`git-stats`](https://github.com/IonicaBizau/git-stats)—Local git statistics including GitHub-like contributions calendars.
 - [`github-stats`](https://github.com/IonicaBizau/github-stats)—Visualize stats about GitHub users and projects in your terminal.
 - [`learn-memory-statistics-cli`](https://github.com/cedced19/learn-memory-statistics-cli#readme) (by Cédric JUNG)—A CLI to see statistics from your Learn Memory server.
 - [`real-votes-admin`](https://github.com/jeffgebhardt/real-votes-admin#readme) (by Jeff Gebhardt)—Admin panel for the real-votes API

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
