<!-- Please do not edit this file. Edit the `blah` field in the `package.json` instead. If in doubt, open an issue. -->








[![cli-pie](http://i.imgur.com/FcSpq0W.png)](#)











# cli-pie

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Ask me anything](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Travis](https://img.shields.io/travis/IonicaBizau/node-cli-pie.svg)](https://travis-ci.org/IonicaBizau/node-cli-pie/) [![Version](https://img.shields.io/npm/v/cli-pie.svg)](https://www.npmjs.com/package/cli-pie) [![Downloads](https://img.shields.io/npm/dt/cli-pie.svg)](https://www.npmjs.com/package/cli-pie) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/@johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

<a href="https://www.buymeacoffee.com/H96WwChMy" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee"></a>







> Generate pie charts in terminal and text mode.











[![cli-pie](http://i.imgur.com/6VA7578.png)](#)







## :cloud: Installation

```sh
# Using npm
npm install --save cli-pie

# Using yarn
yarn add cli-pie
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












## :question: Get Help

There are few ways to get help:



 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:







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
 - `legend` (Boolean): If `true`, a legend is added next to the pie.
 - `display_total` (Boolean): If `true`, the total is added to the legend.
 - `total_label` (String): The label for the total (default: `Total`)
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


## :sparkling_heart: Support my projects
I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:


 - Starring and sharing the projects you like :rocket:
 - [![Buy me a book][badge_amazon]][amazon]—I love books! I will remember you after years if you buy me one. :grin: :book:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)


Thanks! :heart:
















## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - `@childduckling/school-loop`
 - `@tool3/kpods`
 - `android-api-versions-console-chart`
 - `cabdriver`
 - `dupie`
 - `files-extensions`
 - `free-pie`
 - `gdf`
 - `gh-polyglot`
 - `git-stats`
 - `github-stats`
 - `how-dep`
 - `learn-memory-statistics-cli`
 - `neobrag`
 - `pie-my-vulns`
 - `productivity-timer`
 - `tempera`











## :scroll: License

[MIT][license] © [Ionică Bizău][website]






[license]: /LICENSE
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
[badge_patreon]: https://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: https://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: https://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: https://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
