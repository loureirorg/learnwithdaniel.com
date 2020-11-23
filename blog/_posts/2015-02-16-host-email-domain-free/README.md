---
title: "Host your own email domain with Exim4"
date: 2015-02-16
tags: ['Linux', 'Server', 'Configuration']
author: Daniel Loureiro
---
I will show how to host your own email domain (or domains) for free!

Yeah, you can have your own `pam@domain.com` instead of `pam1985b@gmail.com`, which is more professional, and for free.
<!-- more -->

But calm down. This is a complex solution based on email redirection, using a free Gmail account behind the scenes. Yeah, it's a poor man's solution, but your email address will look professional. Your customers will never know that you are using Gmail (or whatever provider) behind the scenes.

::: warning
This tutorial doesn't show how to implement a full POP3/SMTP service. It's only an MTA server with redirection. But it's a good enough solution for small sites.
:::

::: warning
If you want to host your own email domain because you are afraid of NSA or something like that, ~~I recommend to you a psychiatrist~~ ~~I recommend stop selling drugs,~~ this won't be a good solution because it uses Gmail as an SMTP/POP3 server, which means they will have access to your emails. But the process to implement a full email server is pretty similar to this, only a bit more complicated (you will have to install `postfix` and `courier` too).
:::

## Ingredients

- Shell access to a server that will manage this;
- Access to the domain's DNS management;
- A generic email account (eg. `bob2387@google.com`);

## Our recipe

### 1. Let's implement 3 email addresses

- **bob@example.com:** Alias to `bob.example@gmail.com`;
- **pam@example.com:** Alias to `pam.example@gmail.com`;
- **info@example.com:** Alias to `bob.example@gmail.com` + `pam.example@gmail.com`;

### 2. Create your DNS records

- Create an `A` record named `mail` pointing to your server IP;
- Create an `MX` record named `example.com` pointing to `mail.example.com` (replace `example.com` with your actual domain, without `www`)

Example on CloudFlare interface:
![Example on CloudFlare interface](./msx.png#wide)

::: tip
After that, you can test your MX record with this tool: [https://mxtoolbox.com/SuperTool.aspx](https://mxtoolbox.com/SuperTool.aspx)
:::

::: warning
On **MX Toolbox**, "SMTP Test" will give an error because we haven't configurated Exim4 yet. We will fix this through this tutorial.
:::

### 3. Install `Exim4`

```bash
sudo apt-get install exim4 exim4-base exim4-config exim4-daemon-heavy
```

### 4. Re-create the configuration files

Run:

```bash
sudo dpkg-reconfigure exim4-config
```

- On `interfaces`, you need to leave it empty.
- On `split files?`, you need to answer `YES!!!`.


### 5. Edit `/etc/exim4/update-exim4.conf.conf`

```ini
dc_eximconfig_configtype='internet'
dc_other_hostnames='example.com;example2.com'
dc_local_interfaces=''
dc_readhost=''
dc_relay_domains=''
dc_minimaldns='false'
dc_relay_nets=''
dc_smarthost=''
CFILEMODE='644'
dc_use_split_config='false'
dc_hide_mailname=''
dc_mailname_in_oh='true'
dc_localdelivery='mail_spool'
```

`dc_other_hostnames` is optional. You can leave it blank or even incomplete, but if you want to fill it:

- Replace `example.com` and `example2.com` with your actual domains.
- If you have just one domain, use something like: `dc_other_hostnames='example.com'`

### 6. Remove the override configuration file, if existing

```bash
sudo rm /etc/exim4/exim4.conf
```

### 7. Re-create the auto-generated config file (`/var/lib/exim4/config.autogenerated`)

```bash
sudo update-exim4.conf
```

### 8. Create a folder `/etc/valias`

```bash
sudo mkdir /etc/valias
```

### 9. Create a configuration file for each domain in `/etc/valiases`

```bash
sudo nano /etc/valiases/example.com
```

Contents:

```ini
bob: bob.example@gmail.com
pam: pam.example@gmail.com
info: bob.example@gmail.com, pam.example@gmail.com
*: bob.example@gmail.com, pam.example@gmail.com
```

::: tip
Notice the `*` at the last line. It's a catch-all email address. It's optional and it means that any email that doesn't match the above rules will end up there. For example, `test@example.com` will be sent to `bob` and `pam` in this configuration.
:::

### 10. Edit `/etc/exim4/conf.d/main/01_exim4-config_listmacrosdefs`

Set the virtual aliases directory (`/etc/valiases`):
```ini
#domainlist local_domains = MAIN_LOCAL_DOMAINS
domainlist local_domains = @:localhost:dsearch;/var/mail/virtual:dsearch;/etc/valiases
```

### 11. Edit `/etc/exim4/conf.d/router/350_exim4-config_vdom_aliases`

```ini
vdom_aliases:
      driver = redirect
      allow_defer
      allow_fail
      domains = dsearch;/etc/valiases
      data = ${expand:${lookup{$local_part}lsearch*@{/etc/valiases/$domain}}}
      retry_use_local_part
      pipe_transport   = address_pipe
      file_transport   = address_file
      no_more
```

### 12. Add your domains to `/etc/hosts` (OPTIONAL – just for speed sake)

```ini
127.0.1.1       example.com
127.0.1.1       example2.com
```

### 13. Re-start `exim4` service

```bash
sudo /etc/init.d/exim4 restart
```

### 14. Test if it's all working

```bash
sudo exim -bt -d-resolver bob@example.com
```

See logs with:
```bash
tail -f /var/log/exim4/mainlog
```

Check with an external tool:
[https://mxtoolbox.com/SuperTool.aspx](https://mxtoolbox.com/SuperTool.aspx)

### 15. TLS (optional)

If you want to enable TLS, you can use this tutorial and a `CAcert.org` SSL cert for free:
[https://github.com/Exim/exim/wiki/EximServerSslCertificate](https://github.com/Exim/exim/wiki/EximServerSslCertificate)