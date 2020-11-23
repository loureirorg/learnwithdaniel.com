---
title: "WordPress: Quickly Log out all users [Quick Tip]"
date: 2019-08-02
tags: ['WordPress', 'PHP']
author: Daniel Loureiro
---
Want to kill all sessions instantly? Force all users to log out? Have no time? Do this.
<!-- more -->

## This tutorial on video (29 seconds, no sound)

<div class="youtube">
    <iframe width="1200" height="675" src="https://www.youtube.com/embed/7gvJH9wMBqU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## 1. Open `wp-config.php` and look for the `AUTH_KEY` section

![AUTH_KEY Section](./salt-wp-config-1024x325.png#wide)

## 2. Get new session tokens (from the official WP page)

Open: [https://api.wordpress.org/secret-key/1.1/salt/](https://api.wordpress.org/secret-key/1.1/salt/)
![Salt Page](./salt.png#wide)

Copy these values (Ctrl+C). Each time you reload this page, new random values are generated.

## 3. Replace the old values on `wp-config.php`

```php
// wp-config.php
define('AUTH_KEY',         'l3`D(K+w=x_#5|ed2h1j8ag&Jc9t-1O<H.0X3cZtUNsvr>-%<`QNYX:-*sfY(?Sx');
define('SECURE_AUTH_KEY',  '`vzQ4Z5VvM!b=]l4X3h2;6[!}b.*|j-7H8RI^o]y-L_Nz9i?zFoPl|4 +jk}4vU:');
define('LOGGED_IN_KEY',    ' n]?%iHQIlQ;Ml6aEP0${|h*-!lRkF&#038;|>wkR^.-|+pS]|Mwl)NkYlcHfii-EO)9e');
define('NONCE_KEY',        ']$Z}AFA2^v`lz}OqLZ5dQ`$3?J>>--#nO|LWJ?6!L_9b)`;9~9VOf#Vx1jAcUPW=');
define('AUTH_SALT',        'H|[O(,gqn_l%|L>M|q|N8YSP7M#y}*ZFD.zmz_|KQQ@E>TuT+|oIqB[7lPwuI9i0');
define('SECURE_AUTH_SALT', '4co{0co4U!zw3-**2J&d@},-M@C$un!m0x,J+$-r3[#E3u0:oBR&[>8N>sif$,>O');
define('LOGGED_IN_SALT',   'z^+CF-/}cRleMVc^Bz*sR70II=xM[OfVxy3vL{x3,vf^neZS0,t!:)$J+g(wU_>Z');
define('NONCE_SALT',       'kIt~0eE8bAp(JKa0,64H340{-^r95rq>JuQ2fCq?l;Oq*F)IoPqgMOPM|{BHF|]L');
```

## 4. Save the file and that’s all!

This procedure kills all the sessions instantly. All the logged-in users will be instantly required to log in again.

::: tip
This doesn’t affect any credentials. All passwords and usernames remain the same.
:::
