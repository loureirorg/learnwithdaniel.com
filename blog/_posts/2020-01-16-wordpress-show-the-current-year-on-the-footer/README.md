---
title: "Creating Shortcodes on WordPress"
date: 2019-09-20
tags: ['WordPress', 'PHP']
author: Daniel Loureiro
---
A shortcode is a string that will be replaced by dynamic content.
<!-- more -->

Example: `[video src="video-source.mp4"]`.

In this tutorial, we will create a "Hello World" shortcode. Put these codes in your `functions.php`.

## 1. Self-closing tag: `[hello]`

```php
add_shortcode( 'hello', 'hello_callback' );
function hello_callback( $atts ) {
    return "<span>Hello</span>";
}
```

## 2. Tag with attributes: `[hello color="blue"]`

```php
add_shortcode( 'hello', 'hello_callback' );
function hello_callback( $atts ) {
    $color = $atts['color'];
    return "<span style='color: $color;'>Hello</span>";
}
```

Set default attributes with `shortcode_atts(...)`:

```php
add_shortcode( 'hello', 'hello_callback' );
function hello_callback( $atts ) {
    /** Default values. */
    $a = shortcode_atts( [
        'color' => 'black'
    ], $atts );

    /** Print "Hello". */
    $color = $a['color'];
    return "<span style='color: $color;'>Hello</span>";
}
```

### Security – Always escape vars when printing: `esc_attr(...)`

```php
add_shortcode( 'hello', 'hello_callback' );
function hello_callback( $atts ) {
    /** Default values. */
    $a = shortcode_atts( [
        'color' => 'black'
    ], $atts );

    /** Print "Hello". */
    $color = esc_attr( $a['color'] );
    return "<span style='color: $color;'>Hello</span>";
}
```

## 3. Enclosed Content tag: `[hello]World[/hello]`

The content is the second argument:

```php
add_shortcode( 'hello', 'hello_callback' );
function hello_callback( $atts, $contents = null ) {
    /** Default attributes. */
    $a = shortcode_atts( [
        'color' => 'black'
    ], $atts );

    /** Print "Hello". */
    $color = esc_attr( $a['color'] );
    return "<span style='color: $color;'>Hello ". esc_attr( $contents )."</span>";
}
```

## 4. Many tags, one callback

You can use the same callback for multiple tags. In this case, use the third argument `$tag` to differentiate tags.

Let's implement two tags, `[hello]` and `[world]`, on a single callback:

```php
add_shortcode( 'hello', 'hello_callback' );
add_shortcode( 'world', 'hello_callback' );
function hello_callback( $atts, $contents = null, $tag ) {
    if ( 'hello' === $tag ) {
        return "<span>Hello</span>";
    }
    return "<span>World</span>";
}
```
