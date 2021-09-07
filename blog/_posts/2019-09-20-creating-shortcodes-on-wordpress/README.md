---
title: "Creating Shortcodes on WordPress"
date: 2019-09-20
tags: ['WordPress', 'PHP']
author: Daniel Loureiro
---
Shortcodes are strings that WordPress replace with dynamic content.
<!-- more -->

I'm sure you know how to put a video from the library on an article. You write `[video src="my-video.mp4"]` in the paragraph and the video will show.

WordPress replaces the `[video ...]` string with the actual video from your library. This is an example of shortcode usage. Shortcodes are strings enclosed by brackets `[]`.

Shortcodes extend the editor. With them, you are not limited to Gutemberg's blocks, nor to text styling only. They allow us to add dynamic content provided by plugins.

## Example:

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
