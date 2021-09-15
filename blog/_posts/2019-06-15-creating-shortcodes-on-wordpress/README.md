---
title: "Creating Shortcodes on WordPress"
date: 2019-06-15
tags: ['WordPress', 'PHP']
author: Daniel Loureiro
---
In the previous article, we printed a "Hello, World" on screen. It worked, but it was clunky, ugly-looking. That's not how plugins output to pages.

The standard way plugins print content is through `shortcodes`.

Shortcodes are small bits of text that we write in pages. They are enclosed by brackets `[]`, for example, `[hello]`.

When WordPress renders the page, it replaces the shortcodes with plugin's output, for example, `"Hello, World!"`.
<!-- more -->

Shortcodes are powerful because they extend the editor. With them, your content is not limited to Gutemberg's blocks. You can create a plugin to add a calendar to pages, or add forms, and much more.

## Hello, World!

Let's create a "Hello, World!" shortcode.

## 1. Self-closing tag: `[hello]`

```php
add_shortcode( 'hello', 'hello_callback' );
function hello_callback( $atts ) {
    return "<span>Hello, World!</span>";
}
```

## 2. Tag with attributes: `[hello color="blue"]`

```php
add_shortcode( 'hello', 'hello_callback' );
function hello_callback( $atts ) {
    $color = $atts['color'];
    return "<span style='color: $color;'>Hello, World!</span>";
}
```

Set default attributes with `shortcode_atts(...)`:

```php
add_shortcode( 'hello', 'hello_callback' );
function hello_callback( $atts ) {
    /** Default values. */
    $attributes = shortcode_atts( [
        'color' => 'black'
    ], $atts );

    /** Print "Hello". */
    $color = $attributes['color'];
    return "<span style='color: $color;'>Hello, World!</span>";
}
```

### Security – Always escape variables when printing: `esc_attr(...)`

```php
add_shortcode( 'hello', 'hello_callback' );
function hello_callback( $atts ) {
    /** Default values. */
    $attributes = shortcode_atts( [
        'color' => 'black'
    ], $atts );

    /** Print "Hello". */
    $color = esc_attr( $attributes['color'] );
    return "<span style='color: $color;'>Hello, World!</span>";
}
```

## 3. Enclosed Content tag: `[hello]World[/hello]`

The content is the second argument:

```php
add_shortcode( 'hello', 'hello_callback' );
function hello_callback( $atts, $contents = null ) {
    /** Default attributes. */
    $attributes = shortcode_atts( [
        'color' => 'black'
    ], $atts );

    /** Print "Hello". */
    $color = esc_attr( $attributes['color'] );
    return "<span style='color: $color;'>Hello, ". esc_html( $contents )."!</span>";
}
```

Use `esc_html(...)` to escape HTML content.

## 4. Many tags, one callback

You can re-use the same callback for multiple tags. In this case, use the third argument `$tag` to differentiate tags.

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
