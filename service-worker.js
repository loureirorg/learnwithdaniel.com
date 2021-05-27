/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "2015/01/about/index.html",
    "revision": "ca9101d1a7d0315fa16cf9867e9e3731"
  },
  {
    "url": "2015/01/apache-puma-via-reverse-proxy/index.html",
    "revision": "6345fdd2ce5980c636898eeed9252003"
  },
  {
    "url": "2015/01/install-php-5-6-apache-on-ubuntu/index.html",
    "revision": "a544da8ba9cfd973424f7ba71613b33d"
  },
  {
    "url": "2015/01/install-wordpress-4-1-on-ubuntu-14-10/index.html",
    "revision": "48d15e3eded36a0592e2fb1458b65494"
  },
  {
    "url": "2015/02/citystate-list-of-countries-cities-and-states-ruby/index.html",
    "revision": "367b46e086230dce702480dba813f708"
  },
  {
    "url": "2015/02/host-email-domain-free/index.html",
    "revision": "7e46b04c46946b70c3e566e398ae4b7c"
  },
  {
    "url": "2015/09/dragonfly-rails-models-with-images-and-files/index.html",
    "revision": "469e1492b8ba5a9af2d6b2162477cfa5"
  },
  {
    "url": "2015/10/rails-angular-authentication/index.html",
    "revision": "3ebb015a116071febd97f52685e9f56a"
  },
  {
    "url": "2016/08/ruby-to-portable-exe-app/index.html",
    "revision": "335a8e95bac56446c5808fec49e970de"
  },
  {
    "url": "2016/12/js2015-webpages-babel/index.html",
    "revision": "af031b7a67a64143b442d8c1942af48f"
  },
  {
    "url": "2017/04/file-systems-ruby-fuse/index.html",
    "revision": "3145f1531a73e15591e03589a8ac663f"
  },
  {
    "url": "2019/04/joomla-and-memcache-with-unix-sockets/index.html",
    "revision": "ad44f42b09c3c0d9e9a669d406fb34c8"
  },
  {
    "url": "2019/06/atom-php-debugger/index.html",
    "revision": "cd79d893378e4216d4c187c625d2fdfc"
  },
  {
    "url": "2019/06/atom-phpcs-ubuntu/index.html",
    "revision": "8b93c1ac51b3cc960908153410cd1558"
  },
  {
    "url": "2019/06/facebook-sign-up-button-with-js-and-php-tutorial/index.html",
    "revision": "9cfb0050c6f1a3eb6abbe4474f7ab590"
  },
  {
    "url": "2019/06/facebook-sign-up-button-with-php-tutorial/index.html",
    "revision": "6ce27d43efa4cc575adc04267be2361f"
  },
  {
    "url": "2019/06/jquery-range-slider-logarithmic/index.html",
    "revision": "c49113c9a575c27dac400b7eef05c546"
  },
  {
    "url": "2019/06/prism-js-with-wordpress/index.html",
    "revision": "0fb34dd7a1b2f3bb0c389f270d60d539"
  },
  {
    "url": "2019/06/user-per-virtual-host-nginx/index.html",
    "revision": "70e658645c73257f3d930eb702dac1bf"
  },
  {
    "url": "2019/06/wordpress-create-menu/index.html",
    "revision": "88ce80f78a2c0068f29b53746b2eaf24"
  },
  {
    "url": "2019/06/wordpress-options-api-psysh/index.html",
    "revision": "55d408dd884b3195b1b7425d65bd846c"
  },
  {
    "url": "2019/06/wordpress-plugin-development/index.html",
    "revision": "6b8ab3c3d8893285611c79917e758ef2"
  },
  {
    "url": "2019/06/wordpress-settings-with-psysh/index.html",
    "revision": "c70a033d8d722b8dd9b31c3a26fe432a"
  },
  {
    "url": "2019/06/wordpress-with-sqlite/index.html",
    "revision": "7343c8be7602bb678d059cedab9f2afd"
  },
  {
    "url": "2019/07/gmail-client-php-pop3-imap/index.html",
    "revision": "6c7054dc05aca5103ee241c80ce39f4d"
  },
  {
    "url": "2019/07/install-wine-staging-ubuntu-19-04/index.html",
    "revision": "7ffd21c9569634def3ef56bd617b8af6"
  },
  {
    "url": "2019/07/phpmd-atom/index.html",
    "revision": "e634c4184fe34312639ad179fd3af81d"
  },
  {
    "url": "2019/07/wordpress-ajax-rest-api/index.html",
    "revision": "6bb68ab0937058f5c35a8c090e1dd661"
  },
  {
    "url": "2019/07/wordpress-change-new-user-registration-admin-notification/index.html",
    "revision": "f9ac0224d51c3356c13676b82668c583"
  },
  {
    "url": "2019/08/adding-icons-to-gravityform-steps/index.html",
    "revision": "2388d74b26d88354ef729f9a4fb77041"
  },
  {
    "url": "2019/08/customize-your-woocommerce-product-page/index.html",
    "revision": "6ffdc64acbb1ab562bd32d928f3bda16"
  },
  {
    "url": "2019/08/wordpress-log-out-all-users/index.html",
    "revision": "49f2a0ba5e9bb8d54742cf77f9b46818"
  },
  {
    "url": "2019/09/customize-your-woocommerce-cart-page-template/index.html",
    "revision": "7d9059ebc45c161d884387462e753c55"
  },
  {
    "url": "2019/09/gravity-forms-populate-state-from-a-zip-code/index.html",
    "revision": "bad4e242b82d9f303a280549f724db2f"
  },
  {
    "url": "2019/09/publishing-your-first-wordpress-plugin-with-git-and-svn/index.html",
    "revision": "96561dca7c6480053deff00b825f13b3"
  },
  {
    "url": "2019/09/resolved-notifications-doesnt-work-when-submitting-a-form-on-gravityform-api/index.html",
    "revision": "ecf7ed499d1ba89c76534ab09c8c0d5c"
  },
  {
    "url": "2019/09/wordpress-show-the-current-year-on-the-footer/index.html",
    "revision": "856f1896d01d9f0f6b15ef9e7f57d163"
  },
  {
    "url": "2020/01/creating-shortcodes-on-wordpress/index.html",
    "revision": "626fa4d5988d54e16fb45047a4f54724"
  },
  {
    "url": "2020/03/convert-wordpress-readme-txt-to-markdown-automatically/index.html",
    "revision": "2183c19220045450f0fbea488959166d"
  },
  {
    "url": "2020/11/sso-saml2-php/index.html",
    "revision": "b2bf9109179cee4b71f84e36b1802299"
  },
  {
    "url": "2020/11/update-wp-links-after-migration/index.html",
    "revision": "d0dee2b9f46a5ab5644417aeb0766159"
  },
  {
    "url": "2020/12/vscode-php-debugger/index.html",
    "revision": "4dc1e31323ac38cc4d30d018a7a9b104"
  },
  {
    "url": "2021/03/laravel-tinker-show-sql-queries/index.html",
    "revision": "c23e68f430f313677d1fe0d41453a910"
  },
  {
    "url": "2021/03/run-laravel-project-in-subfolder-apache/index.html",
    "revision": "6abb2c6d0ebbdcf450f55cdf80dba720"
  },
  {
    "url": "404.html",
    "revision": "3be6dd2c30e7f291116b49456f906635"
  },
  {
    "url": "assets/css/0.styles.e987fec2.css",
    "revision": "89e3a18143603029995f910ab458e364"
  },
  {
    "url": "assets/img/1-300x225.795caeab.jpg",
    "revision": "795caeabb134e450d9c72e81537fb491"
  },
  {
    "url": "assets/img/28.a1e7be34.png",
    "revision": "a1e7be3447447dcfe00b70b0f2dc77c2"
  },
  {
    "url": "assets/img/add_options_page-768x294.47eb0e47.png",
    "revision": "47eb0e4722963c6bb061da84dd1ba743"
  },
  {
    "url": "assets/img/breakpoint-everything.5bee21f3.png",
    "revision": "5bee21f3cc86232a589f0af7c578bd13"
  },
  {
    "url": "assets/img/breakpoint.c3c11b7a.png",
    "revision": "c3c11b7aca2ded939816acfe15f9b198"
  },
  {
    "url": "assets/img/dev21.7235e472.png",
    "revision": "7235e4723420891397a16795c4dc74e6"
  },
  {
    "url": "assets/img/dev22.971e3dfa.png",
    "revision": "971e3dfaebbc60c701a7b2e7ecb1c2fa"
  },
  {
    "url": "assets/img/dev8.5a4f8b57.png",
    "revision": "5a4f8b5717fd2baf53b10a50ae3c66a6"
  },
  {
    "url": "assets/img/fb-dev-2a.1c52ed3e.png",
    "revision": "1c52ed3ef36aba467bf6620fb07b74d9"
  },
  {
    "url": "assets/img/fb-dev-3a.27ae7189.png",
    "revision": "27ae71895eb3b41e54523a8e8f8e5e6d"
  },
  {
    "url": "assets/img/fb-dev-4a-1024x614.c3928771.png",
    "revision": "c39287718b473a6d3ac093c38c65b53b"
  },
  {
    "url": "assets/img/fb-dev5a.5e8ad269.png",
    "revision": "5e8ad269da27b63e46419593a7c9b357"
  },
  {
    "url": "assets/img/footer-hello.567b32f1.jpeg",
    "revision": "567b32f1f4804ff9187f02ea95606a01"
  },
  {
    "url": "assets/img/gf-state.444842a4.png",
    "revision": "444842a451b5d5d0e8ef05988b83017a"
  },
  {
    "url": "assets/img/gf-zip.23d38ed5.png",
    "revision": "23d38ed54810396f27d2bf6aaa2c5244"
  },
  {
    "url": "assets/img/gmail-alert.c3d154fd.png",
    "revision": "c3d154fda48c7a0752f7179990f10d83"
  },
  {
    "url": "assets/img/gmail-allow-less.f21b4baa.png",
    "revision": "f21b4baadb4e90c3d093fc8f856bdf6d"
  },
  {
    "url": "assets/img/joomla-memcache2.ff8b1356.png",
    "revision": "ff8b1356c40639da55e89c6f9493ee58"
  },
  {
    "url": "assets/img/joomla-memcached.eeb57b0e.png",
    "revision": "eeb57b0e7fa78a20cb6467643945cafc"
  },
  {
    "url": "assets/img/linter-1.49237a1e.png",
    "revision": "49237a1e1c36b83cb58dc734938f78bc"
  },
  {
    "url": "assets/img/linter-4.4401ae88.png",
    "revision": "4401ae88720e6329ead01fd7e5b0aafa"
  },
  {
    "url": "assets/img/linter-5.46550573.png",
    "revision": "465505732a3563b160c0c00c3208d208"
  },
  {
    "url": "assets/img/lwd-dragonfly-server-1.25b18edb.png",
    "revision": "25b18edbd093772af3a674e2c70398df"
  },
  {
    "url": "assets/img/msx.c4c70356.png",
    "revision": "c4c70356ce79c1be965fffa6dc12d140"
  },
  {
    "url": "assets/img/optimised.a200c040.gif",
    "revision": "a200c040038971d63c3fc580745ef543"
  },
  {
    "url": "assets/img/prism1-1024x889.b6b5c748.png",
    "revision": "b6b5c7485588691ccb1cce8d72abc0d0"
  },
  {
    "url": "assets/img/prism2.331d9ada.png",
    "revision": "331d9ada73ff8145289b92d402fda913"
  },
  {
    "url": "assets/img/prism8.4b05c10c.png",
    "revision": "4b05c10c8ad8b9e8de31d1d4aaf359a8"
  },
  {
    "url": "assets/img/psysh.3706ced2.png",
    "revision": "3706ced272ceeaf10f00d54311e5cb98"
  },
  {
    "url": "assets/img/salt-wp-config-1024x325.5e2d4afe.png",
    "revision": "5e2d4afe89982486a3088f1573b57f4e"
  },
  {
    "url": "assets/img/salt.192fbea8.png",
    "revision": "192fbea875d11fb9f72a0b212af80267"
  },
  {
    "url": "assets/img/screenshot-2.6cbe7c88.png",
    "revision": "6cbe7c88fc538b91530c1d460175d93e"
  },
  {
    "url": "assets/img/sqlite4.4aff5715.png",
    "revision": "4aff57152482a63b6a7f3be394b966b5"
  },
  {
    "url": "assets/img/start-debugging-1.eb1b2907.png",
    "revision": "eb1b2907d7b4b36adcccdb704b2b2a7e"
  },
  {
    "url": "assets/img/start-debugging-2.5f0cbf6d.png",
    "revision": "5f0cbf6de23c7b685604ce15eb7d269a"
  },
  {
    "url": "assets/img/support1.cd64edd7.png",
    "revision": "cd64edd7391b816c2efb2bed1cd18610"
  },
  {
    "url": "assets/img/support2.8a310788.png",
    "revision": "8a3107884bc957c90825f3201a5ae02e"
  },
  {
    "url": "assets/img/tinker-sql-improved.96ea5366.png",
    "revision": "96ea53660519f767ca0365934b1ddb1e"
  },
  {
    "url": "assets/img/tinker-sql.99a2c1a1.png",
    "revision": "99a2c1a1cf03b83adba696db1338e498"
  },
  {
    "url": "assets/img/vscode-debug-file.e7ca0bd4.png",
    "revision": "e7ca0bd4d64d864bf602332b80bd2d57"
  },
  {
    "url": "assets/img/vscode-xdebug-php.ac48fa9c.png",
    "revision": "ac48fa9cfdbc74fc4fef8d5ad8d0a21f"
  },
  {
    "url": "assets/img/woo-cart-01.17ca8f7d.png",
    "revision": "17ca8f7da37e3d06dcc032cf6099f7ce"
  },
  {
    "url": "assets/img/woo-cart-final-1024x478.41b5167f.png",
    "revision": "41b5167fcd31cbcc03bd8230a0759edc"
  },
  {
    "url": "assets/img/woo-cart0.c4bd31d5.png",
    "revision": "c4bd31d58cad890c52ca3fcc5a9c2516"
  },
  {
    "url": "assets/img/woo-cart1-1024x559.d1dd4263.png",
    "revision": "d1dd42632b177a848466ab382ad9f55b"
  },
  {
    "url": "assets/img/woo-cart2.c05ad137.png",
    "revision": "c05ad13781ff37219df729ddd7a27d6d"
  },
  {
    "url": "assets/img/woo-cart3-1-1024x558.a17eee4c.png",
    "revision": "a17eee4cb6d94d2341b4a6c4eccbce39"
  },
  {
    "url": "assets/img/woo-cart4.3e497a0f.png",
    "revision": "3e497a0ff69e6f8c4bf5af81f5948242"
  },
  {
    "url": "assets/img/woo-templates-1024x75.004bef76.png",
    "revision": "004bef7688a718bd6a44591fb214e96e"
  },
  {
    "url": "assets/img/woocommerce-cart-list-1024x544.b65f30b3.png",
    "revision": "b65f30b3aee2290a616c1564c66f54e0"
  },
  {
    "url": "assets/img/woocommerce-cart-table-1024x505.ed5c4c52.png",
    "revision": "ed5c4c52b40f97d42565cb229a71bfb1"
  },
  {
    "url": "assets/img/wp-core-page-cut.3a59b76b.png",
    "revision": "3a59b76b34d43594f55ac9a361c9effc"
  },
  {
    "url": "assets/img/wp-error-message.542c4734.png",
    "revision": "542c4734489628cdb20af5143b6c62c0"
  },
  {
    "url": "assets/img/wp-installation-step1.fbf1d8d4.png",
    "revision": "fbf1d8d40ba32d9503f1b04b80d34bee"
  },
  {
    "url": "assets/img/wp-menu-in-settings.98ed6013.png",
    "revision": "98ed601393eaa4e2c6b38b20eac7f4da"
  },
  {
    "url": "assets/img/wp-menu-in-tools.d582b89f.png",
    "revision": "d582b89fb415cd5176feba9e7638977e"
  },
  {
    "url": "assets/img/wp-no-messages.6f590ba5.png",
    "revision": "6f590ba5e63eb39b228a016ad665c8d1"
  },
  {
    "url": "assets/img/wp-plugin-github-markdown.1121218a.jpg",
    "revision": "1121218a6ac6b082839e0c9a307efbe6"
  },
  {
    "url": "assets/img/wp-plugin-github-no-markdown.e7a2fc9e.jpg",
    "revision": "e7a2fc9e81b83f77f7f400d6ca16feea"
  },
  {
    "url": "assets/img/wp-plugin3.c2436481.jpeg",
    "revision": "c24364818ba36fcc303c82a263f8690d"
  },
  {
    "url": "assets/img/wp-render-other-plugins-form.a9b556f9.png",
    "revision": "a9b556f948ae2a01ad31df88265c9bfd"
  },
  {
    "url": "assets/img/wp-settings-final.69da36bd.png",
    "revision": "69da36bd3e6ff6685ff8388e533acbc4"
  },
  {
    "url": "assets/img/wp-settings-saved-success.a5de690a.png",
    "revision": "a5de690a6876f8d2626bd1a0970805e5"
  },
  {
    "url": "assets/img/wp-settings-saved.c4813ecc.png",
    "revision": "c4813ecc79b0daf13b64e7204e2fb6e2"
  },
  {
    "url": "assets/img/wp-settings-success-without-retrieving.69fab963.png",
    "revision": "69fab9632fffed8ad6bd30d2c9d35a60"
  },
  {
    "url": "assets/img/wp-simple-form-with-wrap-cut.05eba981.png",
    "revision": "05eba9812199c7a705141475b960deed"
  },
  {
    "url": "assets/img/wp1.324a82f3.png",
    "revision": "324a82f3cb3ad4d0568fe9aac916d790"
  },
  {
    "url": "assets/img/wp2.69350284.png",
    "revision": "69350284797dcbb8d5577e4d4621e457"
  },
  {
    "url": "assets/img/wp5.946c1a75.png",
    "revision": "946c1a75d28f54a18245627184899d72"
  },
  {
    "url": "assets/img/xdebug-1024x700.9697a25c.png",
    "revision": "9697a25c5dc22f3715adda0a5721b696"
  },
  {
    "url": "assets/img/xdebug-vscode-launch-1.747eca51.png",
    "revision": "747eca51d2e4280855e13a5ce9cfeb4d"
  },
  {
    "url": "assets/img/xdebug-vscode-launch-2.a1d7ec26.png",
    "revision": "a1d7ec26c3465aecaddc48054c869dcb"
  },
  {
    "url": "assets/img/xdebug-vscode.1b18fef6.png",
    "revision": "1b18fef69521b3d8142cf0224f9c3c95"
  },
  {
    "url": "assets/img/xdebug2-1024x320.6b269652.png",
    "revision": "6b269652078b4abd9e504d0a34681d9c"
  },
  {
    "url": "assets/img/xdebug3.caf497a2.png",
    "revision": "caf497a2855d124ce9774154641f4220"
  },
  {
    "url": "assets/js/10.4c3714eb.js",
    "revision": "00ff01b0cabc3644a09296ef2e6b34ce"
  },
  {
    "url": "assets/js/11.7079f1b5.js",
    "revision": "d7d275e3955d4728fae63a99bb10d401"
  },
  {
    "url": "assets/js/12.30908eac.js",
    "revision": "852e3465a79345754c0e7462f3d8b88d"
  },
  {
    "url": "assets/js/13.1193aeb2.js",
    "revision": "70b20a768411f740de14a569d81a8ff6"
  },
  {
    "url": "assets/js/14.4bc83b76.js",
    "revision": "d6c20d76c783842d09619d1729733c21"
  },
  {
    "url": "assets/js/15.2af09bbb.js",
    "revision": "15338a77da559c00eae2b46663a2cea7"
  },
  {
    "url": "assets/js/16.196144a0.js",
    "revision": "42517554533c6d25281aaad984cdf11e"
  },
  {
    "url": "assets/js/17.b3d62ac8.js",
    "revision": "fbfce8d98fdb8387e11e6a075c35fa8b"
  },
  {
    "url": "assets/js/18.7a1395ac.js",
    "revision": "40ed17e5c9d98b35f114b729a357e4af"
  },
  {
    "url": "assets/js/19.3dfe7750.js",
    "revision": "3a0e97b20c8d889e218c56a738289203"
  },
  {
    "url": "assets/js/20.3c0e52ef.js",
    "revision": "a44aefdf59c2a38b0a5273800268427e"
  },
  {
    "url": "assets/js/21.c666357a.js",
    "revision": "4b46c3ec07c005681d2ddd52d9c212b0"
  },
  {
    "url": "assets/js/22.e4e43f22.js",
    "revision": "39141256e50f0759af3c1f07c54f8d23"
  },
  {
    "url": "assets/js/23.0e014d8d.js",
    "revision": "b08387faccc1dfe170640a35447d9f14"
  },
  {
    "url": "assets/js/24.4231828a.js",
    "revision": "e275d6ba4c2d13a1fe6a080c91ffe2cf"
  },
  {
    "url": "assets/js/25.7ad51917.js",
    "revision": "5fc85cefb53dccaa76bf289189656cb2"
  },
  {
    "url": "assets/js/26.f55dff34.js",
    "revision": "0505b740e4cceb1066e9c7919d4e598e"
  },
  {
    "url": "assets/js/27.16b574a7.js",
    "revision": "2f4c01742c95db0ee549619ec4cdd371"
  },
  {
    "url": "assets/js/28.e696bf64.js",
    "revision": "45214f8d5c244574b151da843077972c"
  },
  {
    "url": "assets/js/29.3a4c2350.js",
    "revision": "a52a90f1399ed1e88ee75c5c7baef297"
  },
  {
    "url": "assets/js/3.09541ae7.js",
    "revision": "a5ec58612d7bdb3991ea0a11adc49f4b"
  },
  {
    "url": "assets/js/30.c3bf6a6b.js",
    "revision": "5e6832366c8552c851405c7d63c05131"
  },
  {
    "url": "assets/js/31.9a8e4ff5.js",
    "revision": "216331f73e90f0a38825a8fd76d291f8"
  },
  {
    "url": "assets/js/32.2bc99ab1.js",
    "revision": "301eda5299dc80e2969a94ae1963ae3d"
  },
  {
    "url": "assets/js/33.7e59e2b8.js",
    "revision": "f5a4b1c5aedcd09b9683dbf9f9de657b"
  },
  {
    "url": "assets/js/34.70651105.js",
    "revision": "5bdc057a228b017d6ce6712311e4ccf4"
  },
  {
    "url": "assets/js/35.2942e5d1.js",
    "revision": "91bdb311bdae5f2f44d545610d608a2d"
  },
  {
    "url": "assets/js/36.0b37e781.js",
    "revision": "1be357f0fa5f11af684120d130fee439"
  },
  {
    "url": "assets/js/37.75913168.js",
    "revision": "b90b68fb0849d5adcc920149ca4fa86f"
  },
  {
    "url": "assets/js/38.17e1287c.js",
    "revision": "7a47b168c64eb647655926719eaab2d2"
  },
  {
    "url": "assets/js/39.a71a805c.js",
    "revision": "3bf52f45d5eb73680a1d84e88a8ec202"
  },
  {
    "url": "assets/js/4.870be92f.js",
    "revision": "622aaa89dd4c2d30c9d15f5238bf2b11"
  },
  {
    "url": "assets/js/40.cc6923d2.js",
    "revision": "2cc71fc406d5f10bb3b5903269983a55"
  },
  {
    "url": "assets/js/41.ece946e9.js",
    "revision": "efba6a53a6660ddd5a076d3b769254f1"
  },
  {
    "url": "assets/js/42.80607985.js",
    "revision": "e9e56ff0588154c8ea4a016176853fa5"
  },
  {
    "url": "assets/js/43.41ad0db0.js",
    "revision": "6bd5ae2b74cf0c924b7f29788a491143"
  },
  {
    "url": "assets/js/44.ec7e2883.js",
    "revision": "8076f9e3ec9582c8c8a3b3a64b33eeaa"
  },
  {
    "url": "assets/js/45.9a008c9e.js",
    "revision": "3532e9d68bd221ee0834bbc4bb4d3ac2"
  },
  {
    "url": "assets/js/46.f6292b95.js",
    "revision": "3a151ca3ca21ce844527a2e37df2f75d"
  },
  {
    "url": "assets/js/47.f7d43565.js",
    "revision": "4784d1db848724b61024f7cbb974d95a"
  },
  {
    "url": "assets/js/48.01252c1f.js",
    "revision": "aa6596e4fea2a36869cfe611142973f4"
  },
  {
    "url": "assets/js/49.276a9a99.js",
    "revision": "a96643e020215702e9665c563171d5ca"
  },
  {
    "url": "assets/js/5.2a534df5.js",
    "revision": "119343d83a27ff724e0dbfc586fc425a"
  },
  {
    "url": "assets/js/50.44f92970.js",
    "revision": "3ce391d79d79ee701edbbe208fd4df65"
  },
  {
    "url": "assets/js/51.d1d4833d.js",
    "revision": "ed264a466c9a1c67858a50b87ecfc0a5"
  },
  {
    "url": "assets/js/52.bee71ac4.js",
    "revision": "c5784e57cd00aefb664824ad0b7a907a"
  },
  {
    "url": "assets/js/6.5bd30f1f.js",
    "revision": "0159309cc610ba2788a8078b95d96e3c"
  },
  {
    "url": "assets/js/7.1554fb0e.js",
    "revision": "2affd73cd733867b41a5639b36190512"
  },
  {
    "url": "assets/js/8.7ade35e5.js",
    "revision": "f27a601ebec72e3816ff16a4dca3b54b"
  },
  {
    "url": "assets/js/9.0b3f259f.js",
    "revision": "1ce2269222c1f9103fb9bc0cefb29118"
  },
  {
    "url": "assets/js/app.228b91da.js",
    "revision": "95b3f0a44728bd9207300d6c665a2555"
  },
  {
    "url": "assets/js/vuejs-paginate.fd40cb4f.js",
    "revision": "5e54c2b7ba8fc858adf2234e74c63947"
  },
  {
    "url": "favicon-128.png",
    "revision": "29365a7c076c3f02428330b6b775c250"
  },
  {
    "url": "index.html",
    "revision": "bd14ef29b47adc62ac4d628631df4948"
  },
  {
    "url": "page/2/index.html",
    "revision": "719d171f5bdb5b4d316b20bae42d4c58"
  },
  {
    "url": "page/3/index.html",
    "revision": "4ad853f8f53616ad8268638258698a79"
  },
  {
    "url": "page/4/index.html",
    "revision": "0abf29a1a3697065c68cf4e0df793763"
  },
  {
    "url": "page/5/index.html",
    "revision": "d6040887d2dcb5dee702d0f89b6985e4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
