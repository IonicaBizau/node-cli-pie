![CliPie](http://i.imgur.com/FcSpq0W.png)

# cli-pie
Generate pie charts in terminal and text mode.

## Installation
Run the following commands to download and install the application:

```sh
$ npm install cli-pie
```

## Example

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

![](http://i.imgur.com/6VA7578.png)

## Documentation
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

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
