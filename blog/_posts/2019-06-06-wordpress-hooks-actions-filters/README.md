---
title: WordPress Hooks, Actions and Filters
date: 2019-06-06
tags: ['WordPress', 'PHP']
author: Daniel Loureiro
---
Hooks, Actions, and Filters are the basic building blocks of WordPress. If you want to write code for WordPress, It's crucial to understand them.
<!-- more -->

## The "Observer" Pattern

There's a popular software design pattern to make your code "pluggable". It's the "Observer" pattern.

The Observer pattern is the base of WordPress.

Let's say you have a `Hello, World!` function:

```php
function greetings() {
  echo "Hello, World!";
}
```

And you want to make it extendable by external code, or "pluggable". We can add a callback to it:

```php
function greetings() {
  global $greetings_callback;

  echo "Hello, World!";
  $greetings_callback();
}
```

Now, we can do incredible things, for example, increment a counter when `greetings()` is called:

```php
global $greetings_callback;
$greetings_callback = function () {
  increment_counter();
};
```

Making your code "pluggable" is an excellent way to decrease dependency, and to make the code more reusable.

A limitation in our code is that we can only have one callback assigned to `greetings`.

Let's fix it by implementing the `Observer` pattern. Instead of a single callback, we have a list of them:

- A **list** of callbacks;
- Function to **add** a callback;
- Function to **execute** all callbacks;

```php
global $observers;
$observers = [];

function subscribe( $event_name, $callback ) {
  global $observers;

  $observers[ $event_name ][] = $callback;
}

function notify_all( $event_name ) {
  global $observers;

  foreach ( $observers[ $event_name ] as $callback ) {
    $callback();
  }
}
```

Let's refactor our code to use the Observer Pattern. Let's also add a second callback to print the counter:

```php
function greetings() {
  echo "Hello, World!";
  notify_all( 'greetings' );
}

subscribe( 'greetings', function () {
  increment_counter();
} );

subscribe( 'greetings', function () {
  echo " Counter: " . get_counter();
} );
```

The two callbacks are "observing" the `greetings` event, which is triggered by the `greetings()` function.

Now that we understand the Observer Pattern let's see how WordPress uses it.

## Refactoring for WordPress

Instead of "subscribe" and "notify_all", WordPress uses:

- Subscribe: `add_action( $event_name, $callback )`;
- Notify All: `do_action( $event_name )`;

Let's refactor our `greetings` code with actual WordPress functions:

```php
function greetings() {
  echo "Hello, World!";
  do_action( 'greetings' );
}

add_action( 'greetings', function () {
  increment_counter();
} );
```

It's the same code. We only renamed "subcribe" and "notify_all".

## Events, aka "Hooks"

When we open a page, WordPress triggers a sequence of events with `do_action( $event_name )`.

In WordPress, events are called `hooks`.

There's a event to render the **header**, another for the **body**, the **footer**, etc.

The footer event is the `wp_footer`.

### Understanding the `Hello, World!` code

Let's revisit the code that displays `Hello, World!` on the footer.

```php
add_action( 'wp_footer', function () {
  echo 'Hello, World!';
} );
```

When WordPress renders a page, it calls `do_action( 'wp_footer' )` to render the footer.

This event calls our callback, which prints `Hello, World!`.

## Actions and Filters

There are two types of hooks: `actions` and `filters`.

To understand filters, let's see our `greetings` code:

```php
function greetings() {
  echo "Hello, World!";
  do_action( 'greetings' );
}

add_action( 'greetings', function () {
  increment_counter();
} );
```

Let's say we want `"World"` to be extendable by plugins:

```php{2-3,11-13}
function greetings() {
  $name = do_action( 'greetings_name' );
  echo "Hello, ${name}!";
  do_action( 'greetings' );
}

add_action( 'greetings', function () {
  increment_counter();
} );

add_action( 'greetings_name', function () {
  return 'John';
} );
```

In theory, this would show `Hello, John!`, but it prints `Hello, !`.

That's because `do_action` returns nothing, even though we are returning `John` in our callback.

When we need hooks to return a value, we use `filters`. Otherwise, we have `actions`:

```php{2,11}
function greetings() {
  $name = apply_filters( 'greetings_name', 'World' );
  echo "Hello, ${name}!";
  do_action( 'greetings' );
}

add_action( 'greetings', function () {
  increment_counter();
} );

add_filter( 'greetings_name', function ( $value ) {
  return 'John';
} );
```

This properly returns `Hello, John!`.

Instead of `add_action`, we use `add_filter`.

Instead of `do_action`, we use `apply_filters`.

We are passing `"World"` to `apply_filters`. If there are no callbacks for the filter, it returns the initial value "World".

The initial value, `"World"`, is passed to the first callback. The return of the callback, `"John"`, is passed to the second callback, and so forth and so on.

Each callback has the chance to change the previous value:

<!-- The "notify all" function of **Filters** works similar to `array_reduce` while in **Actions** it works similar to `foreach`. -->

```php
function greetings() {
  $name = apply_filters( 'greetings_name', 'World' );
  echo "Hello, ${name}!";
  do_action( 'greetings' );
}

add_action( 'greetings', function () {
  increment_counter();
} );

add_filter( 'greetings_name', function ( $value ) {
  return 'John';
} );

add_filter( 'greetings_name', function ( $value ) {
  return "${value} Snow";
} );
```

This prints `Hello, John Snow!`.

### Changing the blog title with Filters

Let's see a practical example.

There is a core filter named `wp_title` that gets the title of the blog:

```php
$blog_title = apply_filters( 'wp_title' );
```

Let's replace all `o`'s in the blog's title with `e`'s:

```php
add_filter( 'wp_title', 'title_callback' );

function title_callback( $input ) {
  return replace( $input, 'a', 'e' );
}
```

If the blog title is "Hello, World!", it will become "H**e**lle, W**e**rld!".

### Functions Summary

Filter functions are:

- Subscribe: `add_filter( $event_name, $callback )`;
- Notify All: `apply_filters( $event_name )`;

Action functions are:

- Subscribe: `add_action( $event_name, $callback )`;
- Notify All: `do_action( $event_name )`;

### Differences of Filters and Actions

Under the hood, actions are filters.

Here's the code for `do_action`:

```php
public function do_action( $args ) {
  $this->apply_filters( '', $args );
}
```

The only difference is that Actions discard the results:

- **Filters** return in their callbacks;
- **Actions** don't return anything;

#### Can I use filters for everything?

No. If you do, it is going to work, but it's a bad practice.

It's about readability.

When you see a **filter**, you know it is to read values. You know the callbacks must return something and the return is the input of the next callback.

When you see an **action**, you expect an entry-point for external code.

As a rule of thumb **always use Actions**. Only use Filters if you are reading a value.

## Priority

The order we add callbacks is the order WordPress calls them. Example:

```php
add_action( 'wp_footer', 'world_callback' );
add_action( 'wp_footer', 'hello_callback' );

function world_callback() {
  echo 'Hello ';
}

function hello_callback() {
  echo 'World ';
}
```

This displays "**World** Hello", because `world_callback` is added before `hello_callback`.

We can manually specify the order on the 3rd argument - the `priority`. WordPress executes lower numbers first.

```php
add_action( 'wp_footer', 'world_callback', 20 );
add_action( 'wp_footer', 'hello_callback', 10 );
```

This displays "Hello **World**".

If not specified, the **default priority is 10**.

When multiple callbacks have the same priority, WordPress executes them in the same order they were added.

### Priority for Filters

Priority works in the same way for **Filters** and **Actions**:

```php
add_filter( 'wp_title', 'snow_callback', 20 );
add_filter( 'wp_title', 'john_callback', 10 );
```

## Passing arguments

Some hooks require extra arguments.

For example, let's say we want to pass the current `post_id`, **"321"**, to the callback.

Pass the value as the second parameter:

```php
do_action( 'greetings', 321 );
```

Define the callback with the extra parameter:

```php
function greetings_callback( $post_id ) {
  echo "You are seeing post ID: ${post_id}";
}
```

Call `add_action` passing the arguments count as the **fourth** parameter:

```php
$priority = 10;
$count_arguments = 1;
add_action( 'greetings', 'greetings_callback', $priority, $count_arguments );
```

This displays: `You are seeing post ID: 321`.

### Filters

It works the same for filters.

Just be aware that the **second** parameter is for the initial value.

Pass the extra value as the **third** parameter:

```php
$message = apply_filters( 'greetings', 'Name:', 321 );

add_filter( 'greetings', function ( $value, $post_id ) {
  return "$value John ($post_id)";
}, 10, 2 );

add_filter( 'greetings', function ( $value, $post_id ) {
  return "$value Snow ($post_id)";
}, 10, 2 );
```

The value of `$message` is `Name: John (321) Snow (321)`.

### A practical example

Let's see a practical example. Let's say we want to do some cleanup when a post is deleted.

On WP core, this is executed when a post is deleted:

```php
do_action( 'wp_trash_post', $post_id );
```

We should listen to the `wp_trash_post` action, which passes a `$post_id` argument:

```php
add_action( 'wp_trash_post', 'trash_callback', 10, 1 );

function trash_callback( $post_id ) {
  // my cleanup code
}
```

## Multiple arguments

If there more than one argument, pass them in sequence:

```php
do_action( 'some_action', '10', '20', '30', '40' );
```

Define the arguments as usual and set the argument count (`4`) in "add_action()".

```php
// Notice the value `4` in the last argument.
add_action( 'some_action', function ( $arg1, $arg2, $arg3, $arg4 ) {
  echo "arg1: $arg1; arg2: $arg2; arg3: $arg3; arg4: $arg4;";
}, 10, 4 );
```

This prints: `arg1: 10; arg2: 20; arg3: 30; arg4: 40;`

### Multiple arguments for Filters

Same thing for filters.

```php
$message = apply_filters( 'greetings', 'Name:', 321, 567 );

add_filter( 'greetings', function ( $value, $post_id, $user_id ) {
  return "$value John ($post_id, $user_id)";
}, 10, 3 );

add_filter( 'greetings', function ( $value, $post_id, $user_id ) {
  return "$value Snow ($post_id, $user_id)";
}, 10, 3 );
```

This prints: `"Name: John (321, 567) Snow (321, 567)"`

---

So far, we have been using `functions.php` to put our code. Let's see how to create an actual plugin instead of using `functions.php`.