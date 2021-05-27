---
title: "Run Laravel Project in Subfolder (Apache)"
date: 2021-03-21
tags: ['DevOps', 'PHP', 'Laravel', 'Apache']
author: Daniel Loureiro
---
Let's say you want to run Laravel in a URL subfolder. For example, `https://domain/my-laravel`.
<!-- more -->

```bash
https://domain/            <--- Non-Laravel (React, Vue, Angular, WordPress, etc.)
https://domain/my-laravel  <--- Laravel
```

The root site is stored on `/main-site`, and Laravel is stored on `/laravel-app`.

```bash
/var/www/mysite/main-site
/var/www/mysite/laravel-app
```

On Apache, use the `Alias` directive to point `https://../my-laravel` to `/var/.../laravel-app`:

```apacheconf
<VirtualHost *:80>
    ServerName 11.22.33.44
    ServerAdmin webmaster@localhost

    DocumentRoot /var/www/mysite/main-site/dist
    Alias /my-laravel /var/www/mysite/laravel-app/public

    <Directory /var/www/mysite/main-site>
        AllowOverride All
    </Directory>

    <Directory /var/www/mysite/laravel-app>
        AllowOverride All
    </Directory>

    ErrorLog /var/www/mysite/error.log
    CustomLog /var/www/mysite/access.log combined
</VirtualHost>
```

::: info
`/dist` is the default folder configuration for Angular and React projects. Change it according to your project.

`/public` is the default folder for Laravel applications.
:::

## Two Laravel URL sub-folders

Let's say the Laravel project has an  `/admin` route. You can access it with `https://.../my-laravel/admin`, but it's ugly. Instead, you want to access it with `https://.../admin`.

Use the `ScriptAlias` directive for this:

```apacheconf
<VirtualHost *:80>
    ServerName 11.22.33.44
    ServerAdmin webmaster@localhost

    DocumentRoot /var/www/mysite/main-site/dist
    Alias /api /var/www/mysite/laravel-app/public
    ScriptAlias /admin /var/www/mysite/laravel-app/public

    <Directory /var/www/mysite/main-site>
        AllowOverride All
    </Directory>

    <Directory /var/www/mysite/laravel-app>
        AllowOverride All
    </Directory>

    ErrorLog /var/www/mysite/error.log
    CustomLog /var/www/mysite/access.log combined
</VirtualHost>
```

### Difference of `Alias` vs `ScriptAlias`

* `Alias`: Suppress the URL folder name. When you access `https://.../folder/something`, Laravel only gets `/something`.
* `ScriptAlias`: Do not suppress the URL folder name. When you access `https://.../folder/something`, Laravel gets `/folder/something`.