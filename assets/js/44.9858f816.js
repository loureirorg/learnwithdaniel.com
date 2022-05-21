(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{506:function(e,t,a){"use strict";a.r(t);var s=a(21),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v("Let's see how to upgrade "),a("strong",[e._v("PHP 5.5")]),e._v(" to a newer version on "),a("strong",[e._v("Ubuntu 14.10")]),e._v(".\n")]),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),a("p",[a("strong",[e._v("ARTICLE UPDATE:")]),e._v(" Since version 15, Ubuntu ships with updated versions of PHP. You can still use this article if you want to have multiple different PHP versions, but you don't need it if you just want to use a not outdated version of PHP.")])]),e._v(" "),a("hr"),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("Q:")]),e._v(" When PHP 5.6 will be in the official Canonical repos?")]),e._v(" "),a("p",[a("strong",[e._v("A:")]),e._v(" Probably "),a("strong",[e._v("never")]),e._v(".")])]),e._v(" "),a("p",[e._v("This question has been "),a("a",{attrs:{href:"https://askubuntu.com/questions/527533/when-will-php-5-6-be-in-the-official-canonical-repos",target:"_blank",rel:"noopener noreferrer"}},[e._v("answered"),a("OutboundLink")],1),e._v(" by Marc Deslauriers, security engineer at Canonical, and it makes sense since Canonical priorities for server updates are: "),a("strong",[e._v("stability")]),e._v(", "),a("strong",[e._v("security")]),e._v(", and "),a("strong",[e._v("updates-that-don't-break-legacy-code")]),e._v(" comes first. They don't want to upgrade PHP because 5.5 syntax is significantly different than 5.3.")]),e._v(" "),a("p",[e._v("So, what if we need newer versions than 5.3? An option is to install PHP manually by compiling the source code, which is awful to maintain. Another option is to install via some random rpm found on the internet, which is hard to maintain and probably won't work without some black magic and many updates to our core system libraries.")]),e._v(" "),a("p",[e._v("Luckly, "),a("a",{attrs:{href:"https://github.com/oerdnj",target:"_blank",rel:"noopener noreferrer"}},[e._v("Ondřej Surý"),a("OutboundLink")],1),e._v(" created a "),a("a",{attrs:{href:"https://launchpad.net/~ondrej/+archive/ubuntu/php5-5.6",target:"_blank",rel:"noopener noreferrer"}},[e._v("non-official PPA"),a("OutboundLink")],1),e._v(" that provides an easy way to install and maintain PHP 5.6 and newer versions (5.5, 5.4, and so on).")]),e._v(" "),a("h2",{attrs:{id:"our-recipe"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#our-recipe"}},[e._v("#")]),e._v(" Our recipe")]),e._v(" "),a("h3",{attrs:{id:"_1-we-need-apache-2-4"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-we-need-apache-2-4"}},[e._v("#")]),e._v(" 1. We need Apache 2.4")]),e._v(" "),a("p",[e._v("Check your version with:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ apache2 -v\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#Server version: Apache/2.4.10 (Ubuntu)")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#Server built: Sep 10 2014 11:32:50")]),e._v("\n")])])]),a("p",[e._v("This means you are using the 2.4 version, so you are good to go.")]),e._v(" "),a("p",[e._v("If you are using a "),a("strong",[e._v("lower version than 2.4")]),e._v(", you need to upgrade it to 2.4+ first: "),a("code",[e._v("sudo add-apt-repository ppa:ondrej/apache2")]),e._v(".")]),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),a("p",[e._v("If you upgrade Apache to 2.4+, be aware that you will have to review all your configurations since the structure and syntax is not fully compatible with prior versions.")])]),e._v(" "),a("h2",{attrs:{id:"_2-remove-the-old-php-install-the-new-ppa-and-reinstall-php"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-remove-the-old-php-install-the-new-ppa-and-reinstall-php"}},[e._v("#")]),e._v(" 2. Remove the old PHP, install the new PPA and reinstall PHP")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("apt-get")]),e._v(" remove php5 libapache2-mod-php5\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" add-apt-repository ppa:ondrej/php5-5.6\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("apt-get")]),e._v(" update\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("apt-get")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" php5 libapache2-mod-php5\n")])])]),a("h2",{attrs:{id:"_3-create-a-test-site"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-create-a-test-site"}},[e._v("#")]),e._v(" 3. Create a test site")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("mkdir")]),e._v(" /var/www/php-test\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('""')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("tee")]),e._v(" /var/www/php-test/index.php\n")])])]),a("h2",{attrs:{id:"_4-create-the-apache-conf-file-don-t-forget-the-conf-extension"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-create-the-apache-conf-file-don-t-forget-the-conf-extension"}},[e._v("#")]),e._v(" 4. Create the Apache "),a("code",[e._v(".conf")]),e._v(' file (don\'t forget the ".conf" extension!)')]),e._v(" "),a("div",{staticClass:"language-apacheconf extra-class"},[a("pre",{pre:!0,attrs:{class:"language-apacheconf"}},[a("code",[a("span",{pre:!0,attrs:{class:"token directive-inline property"}},[e._v("DocumentRoot")]),e._v(" /var/www/php-test\n"),a("span",{pre:!0,attrs:{class:"token directive-inline property"}},[e._v("DirectoryIndex")]),e._v(" index.php\n"),a("span",{pre:!0,attrs:{class:"token directive-inline property"}},[e._v("AddHandler")]),e._v(" php-script .php\n")])])]),a("h2",{attrs:{id:"_5-enable-the-site-and-restart-apache"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-enable-the-site-and-restart-apache"}},[e._v("#")]),e._v(" 5. Enable the site and restart Apache")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" a2ensite php-test\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" /etc/init.d/apache2 restart\n")])])]),a("h2",{attrs:{id:"_6-open-the-site-in-your-browser-and-check-if-it-s-all-working"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-open-the-site-in-your-browser-and-check-if-it-s-all-working"}},[e._v("#")]),e._v(" 6. Open the site in your browser and check if it's all working")]),e._v(" "),a("p",[e._v("By this way, our PHP site will work as an Apache module. The other way is to do via FastCGI, which I intend to learn another day.")])])}),[],!1,null,null,null);t.default=n.exports}}]);