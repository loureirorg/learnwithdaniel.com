---
title: "jQuery Slider: Range, Logarithmic and more"
date: 2019-06-11
tags: ['JS', 'jQuery']
author: Daniel Loureiro
---
I will show here how to implement many different slider types using jQuery.
<!-- more -->

## Installation

### You need jQuery and jQuery UI ...
A CDN version:

```html
https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
```

### ... and some styling

You can either use the jQuery UI CSS or write some basic rules for the slider widget.

**Option 1:** Use the official jQuery UI CSS (7.3 KB):

```html
https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css
```

**Option 2:** Add basic rules for the widget instead ([see at the end of the post](#basic-styling-rules-for-the-widget)).

## 1. Simple Slider

First, let’s see a simple slider. It goes from 0 to 10, starts on the middle (position 4), step size of 2:

<div class="iframe">
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " name="cp_embed_1" scrolling="no" src="https://codepen.io/loureirorg/embed/LKExQE?height=265&amp;theme-id=0&amp;slug-hash=LKExQE&amp;default-tab=result&amp;animations=run&amp;editable=&amp;embed-version=2&amp;user=loureirorg&amp;name=cp_embed_1" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_LKExQE" width="100%" height="265" frameborder="0"></iframe>
</div>

```html
<!-- slider.html -->
<input type="text" name="value">

<div id="slider"></div>
```

```js
// slider.js
/* init widget */
$("#slider").slider({
    min: 0, // min value; default 0
    max: 10, // max value
    values: [4], // position of the handle
    step: 2, // step size; default 1
    slide: function(event, ui) { // sliding event
      var value = ui.values[0]; // slider value
      $("[name=value]").val(value); // set value on input
  }
});

/* init input with slider position */
var value = $("#slider").slider("values", 0);
$("[name=value]").val(value);
```

## 2. Range slider (two handlers: `min` and `max`)

<div class="iframe">
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " name="cp_embed_2" scrolling="no" src="https://codepen.io/loureirorg/embed/WqbpOP?height=265&amp;theme-id=0&amp;slug-hash=WqbpOP&amp;default-tab=result&amp;animations=run&amp;editable=&amp;embed-version=2&amp;user=loureirorg&amp;name=cp_embed_2" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_WqbpOP" width="100%" height="265" frameborder="0"></iframe>
</div>

```html
<!-- slider.html -->
<input type="text" name="min">
<input type="text" name="max">

<div id="slider"></div>
```

```js
// slider.html
$("#slider").slider({
    range: true, // enable range mode
    max: 10,
    values: [2, 8], // handlers (position)
    slide: function(event, ui) {
      var min = ui.values[0];
      var max = ui.values[1];
      $("[name=min]").val(min);
      $("[name=max]").val(max);
    }
});

/* show initial values */
var min = $("#slider").slider("values", 0);
var max = $("#slider").slider("values", 1);
$("[name=min]").val(min);
$("[name=max]").val(max);
```

## 3. Fixed values (ex. `[0, 100, 200, 500, 1000, 1500]`)

<div class="iframe">
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " name="cp_embed_3" scrolling="no" src="https://codepen.io/loureirorg/embed/RzNVJz?height=265&amp;theme-id=0&amp;slug-hash=RzNVJz&amp;default-tab=result&amp;animations=run&amp;editable=&amp;embed-version=2&amp;user=loureirorg&amp;name=cp_embed_3" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_RzNVJz" width="100%" height="265" frameborder="0"></iframe>
</div>

Use the slider as an index to the actual values:

```js
// slider.js
/* map the slider values */
var values = [0, 100, 200, 500, 1000, 1500];

/* init widget */
$("#slider").slider({
    range: true,
    max: values.length - 1,
    values: [values[0], values.length - 1],
    slide: function(event, ui) {
      var min = values[ui.values[0]];
      var max = values[ui.values[1]];
      $("[name=min]").val(min);
      $("[name=max]").val(max);
    }
});

/* show initial values */
var min = values[$("#slider").slider("values", 0)];
var max = values[$("#slider").slider("values", 1)];
$("[name=min]").val(min);
$("[name=max]").val(max);
```

## 4. Exponential / Logarithmic values (ex. `[0, 10, 100, 1000, 1000]`)

Instead of manually populate an array with the values, create a function to generate an exponential (or logarithmic or whatever) array.

```js
// slider.js
/* Usage: ary = sliderValuesGenerator();
   Result: [0, 10, 100, 1000, 1000]
 */
function sliderValuesGenerator() {
  var multiplier = 10;
  var steps = 5;
  var currValue = 0;
  var ary = [];
  for (var i = 0; i < steps; i++) {
    currValue = currValue * multiplier;
    ary.push(currValue);
  }
}
```

Then, set `values`:

```js
// slider.js
var values = sliderValuesGenerator();
```

## 5. Formatting values

Let's say you want to **display** values in a **human format** while keeping the **inputs unformatted**.

<div class="iframe">
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " name="cp_embed_4" scrolling="no" src="https://codepen.io/loureirorg/embed/gNbRPr?height=265&amp;theme-id=0&amp;slug-hash=gNbRPr&amp;default-tab=result&amp;animations=run&amp;editable=&amp;embed-version=2&amp;user=loureirorg&amp;name=cp_embed_4" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_gNbRPr" width="100%" height="265" frameborder="0"></iframe>
</div>

**a)** Define min/max labels as span elements:

```html
<!-- slider.html -->
<label>
  <span id="min"></span> to <span id="max"></span>
</label>
```

**b)** Create a function to format the values:

```js
// slider.js
function formatSliderValues(value) {
  /* Converts a number in a human-readable format, by adding separators (forces 2 decimal).
     Ex."12345.67" to "12,345.67"
  */
  var formattedNumber = value
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return '$'+formattedNumber;
}
```

**c)** Whenever the slider is moved, set values for input and label. Do the same in the initializer:

```js{15,16,25,26}
// slider.js
/* map slider values */
var values = [0, 100, 200, 500, 1000, 1500];

/* init widget */
$("#slider").slider({
    range: true,
    max: values.length - 1,
    values: [values[0], values.length - 1],
    slide: function(event, ui) {
      var min = values[ui.values[0]];
      var max = values[ui.values[1]];
      $("[name=min]").val(min);
      $("[name=max]").val(max);
      $("#min").text(formatSliderValues(min));
      $("#max").text(formatSliderValues(max));
    }
});

/* show initial values */
var min = values[$("#slider").slider("values", 0)];
var max = values[$("#slider").slider("values", 1)];
$("[name=min]").val(min);
$("[name=max]").val(max);
$("#min").text(formatSliderValues(min));
$("#max").text(formatSliderValues(max));
```

## 6. "Any"

<div class="iframe">
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " name="cp_embed_5" scrolling="no" src="https://codepen.io/loureirorg/embed/jjEwov?height=265&amp;theme-id=0&amp;slug-hash=jjEwov&amp;default-tab=result&amp;animations=run&amp;editable=&amp;embed-version=2&amp;user=loureirorg&amp;name=cp_embed_5" style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy" id="cp_embed_jjEwov" width="100%" height="265" frameborder="0"></iframe>
</div>

For an `any` maximum, you can use a `null` value. For the minimum, 0 is the "any" minimum:

```js
// slider.js
var values = [0, 100, 200, 500, 1000, 1500, null];
```

```js
// slider.js
function formatSliderValues(value) {
  if (value == null) return 'Any';

  /* This code formats a number in a human value, by adding separators (forces 2 decimal).
     Ex."12345.67" to "12,345.67"
  */
  var formattedNumber = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return '$'+formattedNumber;
}
```

---

## Basic styling rules for the widget

If you want to save some bytes, you can manually define the CSS rules instead of using the jQuery UI CSS file.

```css
#slider {
  width: 200px;
  margin-top: 20px;
}

.ui-widget-content {
  height: 4px;
  background-color: #b7b7b7;
  border: none;
  position: relative;
}

.ui-widget-header {
  background-color: #214472;
  position: absolute;
  height: 100%;
}

.ui-slider-handle {
  top: -8px;
  height: 20px;
  width: 20px;
  background-color: #214472;
  border-radius: 10px;
  border-color: #214472;
  position: absolute;
}
```
