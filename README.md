# Domestika Creative Coding Course

Here be the code I have written as part of the [Domestika Creative Coding with JavaScript course](https://www.domestika.org/en/courses/2729-creative-coding-making-visuals-with-javascript).

## Development

### Install dependencies

All the code in here was written using `node v14.15.0` and `npm v6.14.8`.

Before doing anything else, you will need to install dependencies:

```
npm install
```

### `canvas-sketch` CLI

To create a new sketch, use the following command:

```sh
canvas-sketch sketches/sketch-01.js --new
```

To serve an existing sketch:

```sh
canvas-sketch sketch-01.js --open
```

To specify a different output folder for saving sketches (using <kbd>Cmd</kbd> + <kbd>S</kbd> ):

```sh
canvas-sketch sketch-01.js --open --output=path/to/output
```
