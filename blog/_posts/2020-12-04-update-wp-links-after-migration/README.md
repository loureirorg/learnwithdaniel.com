---
title: "Update WordPress domain links after migration"
date: 2020-11-29
tags: ['PHP', 'WordPress', 'IT Ops']
author: Daniel Loureiro
---
Let's see how to update your domain links after a WordPress migration.
<!-- more -->

## Backup

Do a backup first before doing any changes. Use a WP backup plugin for this.

## Get MySQL Credentials

If you don't have the credentials, they are on `wp-config`:

```php
/** MySQL database username */
define('DB_USER', 'daniel');

/** MySQL database password */
define('DB_PASSWORD', '10203040');

/** MySQL hostname */
define('DB_HOST', 'localhost');
```

## Take a look at the database

Let's see how the links look on the db:

```mysql
SELECT * FROM wp_options WHERE option_name = 'home' OR option_name = 'siteurl';
```

Result:

```text
+-----------+-------------+------------------------------+----------+
| option_id | option_name | option_value                 | autoload |
+-----------+-------------+------------------------------+----------+
|         2 | home        | https://myold-domain.com     | yes      |
|         1 | siteurl     | https://myold-domain.com     | yes      |
+-----------+-------------+------------------------------+----------+
2 rows in set (0.00 sec)
```

As you see, the links have the **domain** plus the **protocol** (`http` or `https`).

## Do the changes

Just run these queries on your MySQL console.

Replace `New` with your new domain (ex. `mynew-domain.com`). Replace `Old` with your old domain (ex. `myold-domain.com`):

```mysql
UPDATE wp_options SET option_value = replace(option_value, 'Old', 'New') WHERE option_name = 'home' OR option_name = 'siteurl';
UPDATE wp_posts SET post_content = replace(post_content, 'Old', 'New');
UPDATE wp_postmeta SET meta_value = replace(meta_value,'Old','New');
UPDATE wp_usermeta SET meta_value = replace(meta_value, 'Old','New');
UPDATE wp_links SET link_url = replace(link_url, 'Old','New');
UPDATE wp_comments SET comment_content = replace(comment_content , 'Old','New');
```

## HTTP vs HTTPS

Use the same queries to fix any `http` into `https`. Just re-run them replacing `New` with `https://` and `Old` with `http://`.

## Troubleshooting: Can't access `admin` dashboard

If for some reason you can't access the admin dashboard, edit `wp-config.php` and set your new domain:

```php
define( 'WP_HOME', 'https://example.com' );
define( 'WP_SITEURL', 'https://example.com' );
```
