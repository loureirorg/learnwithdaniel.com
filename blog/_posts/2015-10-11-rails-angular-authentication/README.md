---
title: "Rails and AngularJS: Authentication with Devise"
date: 2015-10-11
tags: ['Rails', 'Ruby', 'AngularJS', 'JS', 'Gem']
author: Daniel Loureiro
---
Let's see how to use Devise authentication on AngularJS.
<!-- more -->

## Before starting

I assume you have an AngularJS application running on a domain (`https://myfabulousapp.com`) and the Rails API running on another domain (`https://api.myfabulousapp.com`).

Let's create a simple project "test" from the scratch, with this structure:

```bash
test
  +--- api (Rails, running on localhost:3000)
  +--- app (AngularJS, running on localhost:3001)
        +--- index.html
        +--- app.js
        +--- bower_components/
        +--- views
               +--- home.html
```

First, we create the project root folder, `test`:

```bash
# create aplication folder
mkdir test
cd test
```

Now, we create the Rails app with Devise on `test/api`:

```bash
# create backend (api, Rails)
rails new api --api
cd api

# install Devise
gem 'devise' >> Gemfile
bundle install
rails generate devise:install
rails generate devise user
rake db:migrate

# start backend server
rails s
```

Open another terminal window:

```bash
# create frontend folder (app, Angular)
cd test
mkdir app
cd app

# install Angular and the router library
bower install angular --save
bower install angular-ui-router --save

# install a minimalist html webserver
# gem install adsf

# start frontend server
adsf -p 3001
```

Our `app/index.html`:

```html
<html ng-app="myApp">
  <header>
    <script src="/bower_components/angular/angular.js"></script>
    <script src="/bower_components/ui-router/release/angular-ui-router.js"></script>
    <script src="/app.js"></script>
  </header>

  <body>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>

    <ui-view></ui-view>
  </body>
</html>
```

Our very basic `app/app.js`:

```js
var app = angular.module('myApp', [
  'ui.router'
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',

  function (
    $stateProvider,
    $urlRouterProvider,
    $locationProvider
  ) {
    /** Uses "/my-url" instead of "/!#my-url". */
    if (window.history && window.history.pushState) {
      $locationProvider.html5Mode(true);
    }

    /** Router. */
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/views/home.html',

      .otherwise({
        redirectTo: '/'
    });
  }]);
```

The main page on the browser (open `http://localhost:3001`):

```html
Our Awesome Home Page
```

---

## 1. Install [rack-cors](https://github.com/cyu/rack-cors) gem

Add to `api/Gemfile`:

```ruby
gem 'rack-cors', :require => 'rack/cors'
```

Install it:

```bash
bundle install
```

## 2. Allow AngularJS to access Rails

On `api/application.rb`:

```ruby
# CORS
config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # on production, use the line below instead
#   origins 'localhost:3001', 'myfabulousapp.com'
    resource '*', :headers => :any, :methods => [:get, :post, :delete, :put, :head]
  end
end
```

::: danger
**DO NOT add ":options".**

If you do that, you won't be able to destroy sessions, because AngularJS replaces "delete" with "options" when communicating with another domain (and Devise doesn't recognize the "option" verb as a "delete")
:::

Then, **restart the server**.

### 2.1. If Rails --api, enable Sessions

On `api/application.rb`:

```ruby
# Session
config.middleware.use ActionDispatch::Cookies
config.middleware.use ActionDispatch::Session::CookieStore
config.session_store :cookie_store, :key => '_namespace_key'
config.action_dispatch.cookies_serializer = :json
```

## 3. Install [angular_devise](https://github.com/cloudspace/angular_devise) on the AngularJS

```bash
cd test/app
bower install --save angular-devise
```

```html
<!-- app/views/home.html -->
<html ng-app="myApp">
  <header>
    <script src="/bower_components/angular/angular.js"></script>
    <script src="/bower_components/ui-router/release/angular-ui-router.js"></script>
    <script src="/bower_components/angular-devise/lib/devise.js"></script>
    <script src="/app.js"></script>
  </header>

  <body>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>

    <ui-view></ui-view>
  </body>
</html>
```

## 4. Configure AngularJS

### Add Devise module to the app

```js
// app/app.js
angular.module('myApp', ['Devise'])
```

### Set `$http` to always provide credentials

```js
// app/app.js
$httpProvider.defaults.withCredentials = true;
```

### Set Rails API URLs (change `api_url` to your actual API location)

```js
// app/app.js
/** The API base URL. */
var api_url = 'http://localhost:3000/';

/** Sign in. */
AuthProvider.loginPath(api_url + 'users/sign_in.json');
AuthProvider.loginMethod('POST');
AuthProvider.resourceName('user');

/** Sign up. */
AuthProvider.registerPath(api_url + 'users.json');
AuthProvider.registerMethod('POST');
AuthProvider.resourceName('user');

/** Sign out. */
AuthProvider.logoutPath(api_url + 'users/sign_out.json');
AuthProvider.logoutMethod('DELETE');
```

Or a more extensive example:

```js{4,11,18,22,24-39}
// app/app.js
var app = angular.module('myApp', [
  'ui.router',
  'Devise'
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$httpProvider',
  'AuthProvider',

  function (
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $httpProvider,
    AuthProvider
  ) {
    /** Always provide credentials. */
    $httpProvider.defaults.withCredentials = true;

    /** The API base URL. */
    var api_url = 'http://localhost:3000/';

    /** Sign in. */
    AuthProvider.loginPath(api_url + 'users/sign_in.json');
    AuthProvider.loginMethod('POST');
    AuthProvider.resourceName('user');

    /** Sign up. */
    AuthProvider.registerPath(api_url + 'users.json');
    AuthProvider.registerMethod('POST');
    AuthProvider.resourceName('user');

    /** Sign out. */
    AuthProvider.logoutPath(api_url + 'users/sign_out.json');
    AuthProvider.logoutMethod('DELETE');

    /** Uses "/my-url" instead of "/!#my-url". */
    if (window.history && window.history.pushState) {
      $locationProvider.html5Mode(true);
    }

    /** Router. */
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/views/home.html',

      .otherwise({
        redirectTo: '/'
    });

  }]);
```

## 5. Remove the CSRF protection from Rails (I know, I know...)

Comment (or delete) the `protect_from_forgery` line. Also, add a `:json` to the `respond_to`, so it will respond to JSON calls.

```ruby
# api/application_controller.rb
respond_to :html, :json
# protect_from_forgery
```

::: warning
After testing your app and know it is working, you can look for a better solution to deal with CSRF, like use this [angular_rails_csrf](https://github.com/jsanders/angular_rails_csrf) gem (which hasn't worked for me, but you may have more luck - [see my tries here](https://github.com/jsanders/angular_rails_csrf/issues/5#issuecomment-98427917)).
:::

## 6. After a refresh, get the session back

```js
// app/app.js
angular.module('myModule', ['Devise'])
  .run(['Auth', function (Auth) {
    Auth.currentUser().then(function(user) {
      console.log(user);
      console.log(Auth._currentUser);
    });
  }]);
```

## 7. That's all! :)
