---
title: "Adding icons to GravityForm steps"
date: 2019-08-28
tags: ['WordPress', 'PHP']
author: Daniel Loureiro
---
Let’s say you want to have icons on your steps:
<!-- more -->

![GravityForms Steps with icons](./step-icons.png)

Gravity Forms doesn’t support icons, but you can easily add them using nothing but pure CSS:

```css
/**
 * Add a 64x64 circle on steps.
 *  "gf_step" is a standard GF class.
 */
.gf_step::before {
  content: ' ';
  display: block;
  width: 64px; /** circle size of 64x64 px. */
  height: 64px;
  background-color: gray; /** the disabled color. */
  border-radius: 100%; /** circle. */
  margin: auto; /** horizontal centering. */
  margin-bottom: 12px; /** spacing between circle and step title. */
  background-repeat: no-repeat;
  background-size: auto 36px; /** max image icon height. */
  background-position: center; /** centers the image on icon. */
}

/** Set a green background for the active icon. */
.gf_step_active::before {
  background-color: green;
}

/** Hide icons on Mobile (optional). */
@media only screen and (max-width: 767px) {
.gf_step::before {
  display: none;
}}

/** Icon 1 (loan). */
#gf_step_1_1::before {
  background-image: url("/wp-content/uploads/2019/08/icon-dollar.png");
}

/** Icon 2 (name). */
#gf_step_1_2::before {
  background-image: url("/wp-content/uploads/2019/08/ico-name.png");
}

/** Icon 3 (contact). */
#gf_step_1_3::before {
  background-image: url("/wp-content/uploads/2019/08/ico-contact.png");
}

/** Icon 4 (income). */
#gf_step_1_4::before {
  background-image: url("/wp-content/uploads/2019/08/ico-cashbook.png");
}
```

## Setting icon images

To set the icon images, upload them to your “Media” files, get the image URL and set them on `#gf_step_<form_id>_<step_number>`.
