---
title: "JS2015 on web pages with Babel (in 5 steps)"
date: 2016-12-31
tags: ['JS', 'Tools']
author: Daniel Loureiro
---
Let's use Babel and Browserfy to run ES6 code on old unsupported browsers.
<!-- more -->

::: warning
**OUTDATED:** Nowdays (2019+) all major browsers support ES6 natively, so you don't need this anymore. Check [caniuse](https://caniuse.com/?search=es6) for an updated status of ES6 support.
:::

## A simple ES6 example

Let's create an example using some of the ES6 features: `export` to create libraries, `import` to load an external library, `class` to define classes.

```html
<!-- index.html -->
<html>
  <body>
    <script type="text/javascript" src="app.js"></script>
  </body>
</html>
```

```js
// app.js
/** Import a function from an external file. */
import flashMessage from './an-external-file.js';

/** Example of class definition. */
class Test {
  constructor(msg) {
    alert(msg);
  }
}

/** Using the above class. */
let x = new Test('Hello');

/** Using the imported function from our external file. */
flashMessage('World');
```

```js
// an-external-file.js
export default function(msg) {
  alert(msg);
}
```

---

## 1. Check if `npm` is installed

```bash
npm --version
  4.2.0
```

## 2. Install Babel modules

```bash
npm init
npm install babel-cli babel-preset-es2015 browserify babelify --save-dev
```

## 3. Transpile to ES2016

```bash
browserify app.js -o app-es2016.js -t [ babelify --presets [es2015] ]
```

Be aware of spaces in the brackets!

### Wrong
`[babelify --presets [es2015]]`

### Correct
`[ babelify --presets [es2015] ]`

## 4. Use the transpiled file, not the ES6 files

```html
<!-- index.html -->
<html>
  <body>
    <script type="text/javascript" src="app-es2016.js"></script>
  </body>
</html>
```

## 5. Repeat step 3 whenever you change the JS files

If you don't want to repeat step 3 manually, for every change, you can use Grunt to automate this process.

Grunt can monitor changes on JS files and automatically transpile them.

To avoid cache issues, you can change the generated file name on each transpilation. Grunt can handle this, and also automatically change  the "src" reference in your `index.html`.

## 6. Done!

That's it. You can now develop in ES6+ and still use it on old unsupported browsers.

## Using it with React

::: danger
**UPDATE:** As for 2019, I strongly suggest you to use the `create-react-app` tool instead of the following method. The solution below was written on a time that this tool didn't exist.
:::

### 1. Install ReactJS (if you haven't yet)

```bash
npm install react react-dom --save
```

### 2. Install ReactJS module

```bash
npm install babel-preset-react --save-dev
```

### 3. Transpile it with ReactJS module set

```bash
browserify app.js -o app-es2016.js -t [ babelify --presets [es2015 react] ]
```

::: warning
This `browserfy` command is different than the previous one without ReactJS module.
:::

---

## Common problems

If you see this error message:

```bash
ParseError: 'import' and 'export' may appear only with 'sourceType: module'
```

Then, you have a wrong spacing in the brackets. Spaces are important for the `browserfy` command.
