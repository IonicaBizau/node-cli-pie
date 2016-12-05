## Documentation

You can see below the API reference of this module.

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

