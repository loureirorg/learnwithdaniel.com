---
title: "[SOLVED] Notifications dont't work when submitting a form on GravityForm API"
date: 2019-09-06
tags: ['WordPress', 'PHP']
author: Daniel Loureiro
---
By default, notifications only work when submitting through the web interface. If you are submitting forms using the REST API, notifications will be ignored.
<!-- more -->

**Solution:** Add this code to your `functions.php` (Appearance > Theme Editor > functions.php):

```php
/**
 * Force notifications when submiting a GravityForm via REST API.
 */
add_action( 'gform_post_add_entry', 'add_entry_callback', 10, 2 );
function add_entry_callback( $entry, $form ) {
  if ( 1 === $form['id'] ) {
    GFAPI::send_notifications( $form, $entry );
  }
}
```

::: warning
**NOTICE:** Replace `1` with your form ID.
:::
