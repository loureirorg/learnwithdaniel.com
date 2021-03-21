---
title: "Run Laravel Project in Subfolder (Apache)"
date: 2021-03-21
tags: ['DevOps', 'PHP', 'Laravel', 'Apache']
author: Daniel Loureiro
---
Let's say you want your Laravel in a subfolder. For example, it's the API of a non-Laravel site:
<!-- more -->

```bash
APP: https://mysite.com/     <--- Non-Laravel (React, Vue, Angular, etc.)
API: https://mysite.com/api  <--- Laravel
```

Considering your frontend and backend are stored in different file folders:

```bash
/var/www/mysite/app
/var/www/mysite/api
```

To make this work, use the `Alias` directive:

```apacheconf
<VirtualHost *:80>
    ServerName 11.22.33.44
    ServerAdmin webmaster@localhost

    DocumentRoot /var/www/mysite/app/dist
    Alias /api /var/www/mysite/api/public

    <Directory /var/www/mysite/app>
        AllowOverride All
    </Directory>

    <Directory /var/www/mysite/api>
        AllowOverride All
    </Directory>

    ErrorLog /var/www/mysite/error.log
    CustomLog /var/www/mysite/access.log combined
</VirtualHost>
```

::: info
`/dist` is the default folder configuration for Angular and React projects. Change it according to your frontend.
:::

## Two Laravel sub-folders

Let's say you also have an `/admin` URL, managed by Laravel. You can access it with `/api/admin`, but it's ugly. Instead, use the `ScriptAlias` directive to access it directly:

```apacheconf
<VirtualHost *:80>
    ServerName 11.22.33.44
    ServerAdmin webmaster@localhost

    DocumentRoot /var/www/mysite/app/dist
    Alias /api /var/www/mysite/api/public
    ScriptAlias /admin /var/www/mysite/api/public

    <Directory /var/www/mysite/app>
        AllowOverride All
    </Directory>

    <Directory /var/www/mysite/api>
        AllowOverride All
    </Directory>

    ErrorLog /var/www/mysite/error.log
    CustomLog /var/www/mysite/access.log combined
</VirtualHost>
```

### Difference of `Alias` vs `ScriptAlias`

* `Alias`: Suppress the folder name. When you access `https://mysite.com/api/something`, Laravel only gets `/something`.
* `ScriptAlias`: Do not suppress the folder name. When you access `https://mysite.com/admin/something`, Laravel gets `/admin/something`.