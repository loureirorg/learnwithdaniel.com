---
title: "WordPress Development - Setting the environment"
date: 2019-06-04
tags: ['WordPress', 'PHP']
author: Daniel Loureiro
---
The first thing to start developing for WordPress is to have a development environment. Let's see how to do it.
<!-- more -->

## 1. Choosing a Code Editor

You can use any PHP code editor you like: VS Code, Atom Editor, Sublime, PHP Storm, etc.

The only thing I strongly recommend is to pick one with a **debugger** integrated.

## 2. Code Style

Should the variables be written in camelCase, PascalCase, or snake_case? Does it matter?

It's a bad practice to use your own code styling, especially if other people will work on your code. And that's true not just for WordPress - it is a universal truth for software development.

Always use the code-styling that is the standard for the language or platform you are developing.

WordPress has an official standard, the [WordPress coding standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/).

PSR, the official code-styling for PHP, is acceptable but controversial.

::: tip
Instead of memorizing styling rules, use `PHPCS`.

PHPCS is a tool to check your code style while you type it.
:::

## 3. WP-CLI

The following software we need is `WP-CLI`.

WP-CLI is a command-line tool to manage WordPress websites. It is an official tool developed by the WordPress team.

WP-CLI has commands to help with plugin development.

For install instructions visit: [https://wp-cli.org/](https://wp-cli.org/)

## 4. Have a WordPress instance for the plugin

So far, we have seen three software items: **code editor**, **PHPCS**, and **WP-CLI**.

Now, we need to install WordPress - we will develop our plugin on it.

Do not re-use an existing WordPress installation. We need an empty, brand new WordPress instance to work as a container for our plugin.

In other words, we need to download WordPress, unpack it, create a new empty database, start a web-server, and run the WordPress installer.

Although you can use an existing WordPress installation to develop a new plugin, that's a bad practice.

Each plugin project should have its own WordPress installation.

### 4.1. Quickly create WordPress copies with `WP-CLI`

Let's use `WP-CLI` to download and extract WordPress quickly:

```bash
mkdir my-wp
cd my-wp

wp core download
  Downloading WordPress 5.2.3 (en_US)...
  md5 hash verified: bde83b629bc7a833f7000bc522cde120

ls
  index.php        wp-blog-header.php    wp-includes        wp-settings.php
  license.txt      wp-comments-post.php  wp-links-opml.php  wp-signup.php
  readme.html      wp-config-sample.php  wp-load.php        wp-trackback.php
  wp-activate.php  wp-content            wp-login.php       xmlrpc.php
  wp-admin         wp-cron.php           wp-mail.php
```

### 4.2. Create a MySQL database

```bash
mysql -u root
```

```sql
CREATE DATABASE my_wp_db;
```

### 4.3. Run the web-server

We can use the built-in PHP server for this.

```bash
php -S localhost:3000
```

### 4.4. Run the installer

Open it on the browser (ex. `http://localhost:3000`) and finish the installation process.

---

Now that we have a development environment set, let's do a `Hello, World!` in the following article.
