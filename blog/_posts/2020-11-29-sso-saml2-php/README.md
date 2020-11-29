---
title: "SAML2 on PHP"
date: 2020-11-29
tags: ['PHP', 'SAML2', 'SSO']
author: Daniel Loureiro
---
Let's implement a SAML2 SSO on PHP using the `simplesamlphp/saml2` library.
<!-- more -->

## Basic concepts

<div class="iframe">
<iframe src="https://docs.google.com/presentation/d/1Hn19iARt_dWFV3ESquXpJqImOK2BRVYYcr31ZzPZEWQ/embed?start=false&amp;loop=false&amp;delayms=3000" allowfullscreen="allowfullscreen" width="960" height="569"></iframe>
</div>

## Install `saml2` library

```bash
composer require simplesamlphp/saml2:^3
composer require simplesamlphp/simplesamlphp
```

::: warning
`simplesamlphp` is a full authentication server. It's just like *Kerberos* and *FreeRADIUS* are for *LDAP*.

`simplesamlphp` is an application, not a library, but we **are not running it**, just using some of its source-code files.
:::

## Generate keys

We need public (`cert`) and private (`key`) keys.

**Follow these instructions:**
[https://www.akadia.com/services/ssh_test_certificate.html](https://www.akadia.com/services/ssh_test_certificate.html)

Save them as `my.crt` (public key) and `my.key` (private key).

## Metadata script (for IdP)

```php
<?php
/** Composer. */
require 'vendor/autoload.php';

/** My domain and cert. */
$url       = 'https://learnwithdaniel.com';
$cert_path = './my.crt';

function x509_content($str) {
    $header = '/-----BEGIN CERTIFICATE-----(.*)-----END CERTIFICATE-----/sm';
    if (preg_match($header, $str, $match) === 1) {
        return $match[1];
    }
    return '';
}

/** EntityDescriptor. */
$entity_descriptor = new SAML2\XML\md\EntityDescriptor();
$entity_descriptor->setEntityID('urn:learnwithdaniel.com');
$entity_descriptor->setID(md5(uniqid('', true))); // temporary random id

/** Contact Person. */
$contact_person = new SAML2\XML\md\ContactPerson();
$contact_person->setContactType('support');
$contact_person->setCompany('LWD');
$contact_person->addEmailAddress('loureiro.rg@gmail.com');
$entity_descriptor->addContactPerson($contact_person);

/** Dump root. */
$root_element = $entity_descriptor->toXML();

/** IDPSSODescriptor. */
$idp_sso_descriptor = new SAML2\XML\md\IDPSSODescriptor();
$idp_sso_descriptor->setWantAuthnRequestsSigned(false);
$idp_sso_descriptor->addProtocolSupportEnumeration(SAML2\Constants::NS_SAMLP);
$idp_sso_descriptor->setNameIDFormat([ SAML2\Constants::NAMEID_EMAIL_ADDRESS ]);

$sso_service = new SAML2\XML\md\EndpointType();
$sso_service->setBinding(SAML2\Constants::BINDING_HTTP_POST);
$sso_service->setLocation($url . "/sso");
$idp_sso_descriptor->addSingleSignOnService($sso_service);

$slo_service = new SAML2\XML\md\EndpointType();
$slo_service->setBinding(SAML2\Constants::BINDING_HTTP_POST);
$slo_service->setLocation($url . "/slo");
$idp_sso_descriptor->addSingleLogOutService($slo_service);

/** Load IdP certificate. */
$idp_cert    = file_get_contents($cert_path);
$idp_pub_key = new \RobRichards\XMLSecLibs\XMLSecurityKey(
    \RobRichards\XMLSecLibs\XMLSecurityKey::RSA_SHA256,
    [ 'type' => 'public' ]
);
$idp_pub_key->loadKey($idp_cert, false, true);

/** Key Descriptor. */
$key_descriptor = SAML2\Utils::createKeyDescriptor(
    x509_content(
        file_get_contents($cert_path)
    )
);
$key_descriptor->setUse('signing');
$idp_sso_descriptor->addKeyDescriptor($key_descriptor);


/** Dump IDPSSODescriptor. */
$idp_sso_descriptor->toXML($root_element);

/** Print XML. */
echo $root_element->parentNode->saveXML();
```

::: tip
Check the slides to understand the code.
:::

::: warning
Change the *EntityID* (`urn:learnwithdaniel`), the contact data, and the *SSO*/*SLO* endpoints to your own data;
:::

## Metadata script (for SP)

Same script as for *IdP*.

Just use `SPSSODescriptor` instead of `IDPSSODescriptor`.

## IdP and SP Scripts

That’s all for now, folks!

If this article gets enough access, I will show how to implement the IdP side, as well as the SP side.
