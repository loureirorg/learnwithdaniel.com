---
title: "WordPress: Show the current year on the footer"
date: 2020-01-16
tags: ['WordPress', 'PHP']
author: Daniel Loureiro
---
Let's create a shortcode to show the current year.
<!-- more -->

On `functions.php` (Appearance > Theme Editor > Theme Functions), add this code:

```php
/** Create [year] shortcode. */
add_shortcode( 'year', 'year_callback' );
function year_callback( $atts ) {
    return '<span>'.date( 'Y' ).'</span>';
}
```

Then, use it like this:

```html
Copyleft © [year] LearnWithDaniel.com
```

That's it! WordPress will replace `[year]` with the actual current year on your pages and posts.

## Alternative: Using JS

A problem with the previous solution is that if you are using a static page generator to speed-up your site, a technology that is getting common nowdays, it may display a wrong year. It may display the year of when the page was last updated instead of the current year.

To fix it, you can implement it on JS instead. A JS solution will fix the issue when using static page generators, as the year will be calculated on the user side. Also, this solution requires no changes on `functions.php`.

Add this JS code (through a Custom HTML Widget, or on the theme customization "Appearance > Customize", or through a plugin like "Custom CSS & JS"):

```js
document.querySelectorAll('.year').forEach(
    function(e) {
        e.innerHTML = new Date().getFullYear()
    }
);
```

Then use it like this:

```html
Copyleft © <span class="year"></span> LearnWithDaniel.com
```

## An over-engineered solution: Shortcode with a JS callback

A problem with the JS solution is that it uses the user's clock. If the user's clock is wrong and set to 5 years ago, it will show "2016" instead of "2021" for example (considering we are in 2021).

Also, if the JS is broken or disabled, it won't show the year.

To fix it, we can have the best of both worlds. We render the year on the server side, and update it via JS. If JS is not working, it will still show an year.

Use the shortcode `[year]` and this on `functions.php`:

```php
/** Create [year] shortcode. */
add_shortcode( 'year', 'year_callback' );
function year_callback( $atts ) {
    return '<span class="year">'.date('Y').'</span>';
}

/** Add a JS fallback to [year]. */
add_action( 'wp_enqueue_scripts', 'year_script' );
function year_script() {
    $script = "document.querySelectorAll('.year').forEach(function(e) { e.innerHTML = new Date().getFullYear() })";
    wp_register_script( 'year-script-handler', '' );
    wp_enqueue_script( 'year-script-handler' );
    wp_add_inline_script( 'year-script-handler', $script );
}
```
