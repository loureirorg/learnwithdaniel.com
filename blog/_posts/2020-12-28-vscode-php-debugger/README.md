---
title: "Debug PHP on VSCode with XDebug"
date: 2019-06-05
tags: ['PHP', 'Tools', 'VSCode', 'Debug']
author: Daniel Loureiro
---
This tutorial shows how to debug PHP on VSCode Editor.
<!-- more -->

## 1. Install xdebug

```bash
sudo apt install php-xdebug
```

## 2. Check installation

Create a temporary file to display your `phpinfo` information:

```bash
cd
echo "<?php phpinfo();" > phpinfo.php
php -S localhost:3000
    PHP 7.3.6-1+ubuntu19.04.1+deb.sury.org+1 Development Server started at Wed Jun  5 17:20:29 2019
    Listening on http://localhost:3000
    Document root is /home/daniel
    Press Ctrl-C to quit.
```

Now, **(1)** open the page, **(2)** search for xdebug, and **(3)** get the `xdebug.ini` path:
![PHPInfo on browser](./xdebug-1024x700.png#wide)

Down on the same page, check if the module is enabled:
![xdebug details on phpinfo page](./xdebug2-1024x320.png#wide)

Now you can remove the `phpinfo.php` file (optional):

```bash
cd
rm phpinfo.php
```

## 3. Add these lines to `xdebug.ini`

```ini
# /etc/php/7.3/cli/conf.d/20-xdebug.ini

# xdebug v2.x
xdebug.remote_enable=1
xdebug.remote_host=127.0.0.1
xdebug.remote_connect_back=1    # Not safe for production servers
xdebug.remote_port=9000
xdebug.remote_handler=dbgp
xdebug.remote_mode=req
xdebug.remote_autostart=true

# xdebug v3.x
xdebug.mode = debug
xdebug.start_with_request = yes
xdebug.client_port = 9000
```

## 4. Install `PHP Debug` plugin on VSCode

On VSCode,
(1) Click on `Extensions` tab (`Ctrl+Shift+X`); and
(2) Install package `PHP Debug` by *Felix Becker*:

![PHP Debug package](./xdebug-vscode.png)

## 5. Re-start VSCode editor

## 6. Debugging

### 1. Click on `Run` tab (`Ctrl+Shift+D`)

![The "Run" tab](./xdebug-vscode-launch-1.png)

### 2. Click on `create a launch.json file`

![The "create launch.json" link](./xdebug-vscode-launch-2.png)

### 3. Click on `PHP`

![Selecting PHP](./vscode-xdebug-php.png)

You can close the `launch.json` file:
![`launch.json` file](./vscode-debug-file.png)

### 4. Click on the Play icon

![Play](./start-debugging-1.png)

The debugger tools will appear:
![Debugger tools](./start-debugging-2.png)

### 5. Set breakpoints (click on the ruler)

![A breakpoint](./breakpoint.png)

::: tip
Unselect `Everything` for performance and for your sanity.

![A breakpoint](./breakpoint-everything.png)
:::
