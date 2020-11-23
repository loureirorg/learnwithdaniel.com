---
title: "Install PHP 5.6 on Ubuntu 14.10"
date: 2015-01-16
tags: ['Configuration', 'Linux', 'Server']
author: Daniel Loureiro
---
Let's see how to upgrade **PHP 5.5** to a newer version on **Ubuntu 14.10**.
<!-- more -->

::: warning
**ARTICLE UPDATE:** Since version 15, Ubuntu ships with updated versions of PHP. You can still use this article if you want to have multiple different PHP versions, but you don't need it if you just want to use a not outdated version of PHP.
:::

---

> **Q:** When PHP 5.6 will be in the official Canonical repos?
>
> **A:** Probably **never**.

This question has been [answered](https://askubuntu.com/questions/527533/when-will-php-5-6-be-in-the-official-canonical-repos) by Marc Deslauriers, security engineer at Canonical, and it makes sense since Canonical priorities for server updates are: **stability**, **security**, and **updates-that-don't-break-legacy-code** comes first. They don't want to upgrade PHP because 5.5 syntax is significantly different than 5.3.

So, what if we need newer versions than 5.3? An option is to install PHP manually by compiling the source code, which is awful to maintain. Another option is to install via some random rpm found on the internet, which is hard to maintain and probably won't work without some black magic and many updates to our core system libraries.

Luckly, [Ondřej Surý](https://github.com/oerdnj) created a [non-official PPA](https://launchpad.net/~ondrej/+archive/ubuntu/php5-5.6) that provides an easy way to install and maintain PHP 5.6 and newer versions (5.5, 5.4, and so on).

## Our recipe

### 1. We need Apache 2.4

Check your version with:

```bash
$ apache2 -v
  #Server version: Apache/2.4.10 (Ubuntu)
  #Server built: Sep 10 2014 11:32:50
```

This means you are using the 2.4 version, so you are good to go.

If you are using a **lower version than 2.4**, you need to upgrade it to 2.4+ first: `sudo add-apt-repository ppa:ondrej/apache2`.

::: warning
If you upgrade Apache to 2.4+, be aware that you will have to review all your configurations since the structure and syntax is not fully compatible with prior versions.
:::

## 2. Remove the old PHP, install the new PPA and reinstall PHP

```bash
sudo apt-get remove php5 libapache2-mod-php5
sudo add-apt-repository ppa:ondrej/php5-5.6
sudo apt-get update
sudo apt-get install php5 libapache2-mod-php5
```

## 3. Create a test site

```bash
sudo mkdir /var/www/php-test
echo "" | sudo tee /var/www/php-test/index.php
```

## 4. Create the Apache `.conf` file (don't forget the ".conf" extension!)

```apacheconf
DocumentRoot /var/www/php-test
DirectoryIndex index.php
AddHandler php-script .php
```

## 5. Enable the site and restart Apache

```bash
sudo a2ensite php-test
sudo /etc/init.d/apache2 restart
```

## 6. Open the site in your browser and check if it's all working

By this way, our PHP site will work as an Apache module. The other way is to do via FastCGI, which I intend to learn another day.
