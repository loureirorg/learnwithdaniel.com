---
title: "Install Wine Staging on Ubuntu 19.04"
date: 2019-07-28
tags: ['Wine', 'Linux']
author: Daniel Loureiro
---
This tutorial on video (1 min, no sound):
<!-- more -->

<div class="youtube">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Ld-eI0fpQ2M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

The recipe:

```bash
sudo dpkg --add-architecture i386
wget -nc https://dl.winehq.org/wine-builds/winehq.key
sudo apt-key add winehq.key
sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ disco main'
sudo apt install --install-recommends winehq-staging
rm winehq.key
```

Then, test it with:

```bash
wine --version
    wine-4.12.1 (Staging)
```

***PS:** This tutorial is based on the official instructions: [https://wiki.winehq.org/Ubuntu](https://wiki.winehq.org/Ubuntu).*
