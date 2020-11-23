---
title: "Ruby to EXE – Turn ruby scripts into portable executable apps"
date: 2016-08-21
tags: ['Ruby', 'Tools']
author: Daniel Loureiro
---
Let's see how to compile ruby scripts into standalone binaries.
<!-- more -->

## This method works with

- Rails apps (your executable file will be a portable webserver);
- Scripts with gems;
- Simple, single-source file scripts;
- Multiple source file scripts;

The final app will be a single executable file that can run on systems without a ruby interpreter installed.

---

## UPDATE

**I developed a gem to automate this process.** Check it out:
[https://github.com/loureirorg/rb2exe](https://github.com/loureirorg/rb2exe)

### Usage

```bash
gem install rb2exe

echo "puts 'Hello world'" > test.rb

rb2exe test.rb
./test
    Hello world
```

---

## How this works, step-by-step

### First, let's create a Hello World app

```bash
mkdir hello
cd hello
echo "puts 'Hello world'" > test.rb
ruby test.rb
    Hello world
```

This method uses **Ruby Traveler** and pack everything into a self-extract file.

Ruby Traveler is just a static folder with a standalone "ruby" executable. The plan here is to add Ruby Traveler's folder and binaries to our project and compress everything into a single self-extractable zip file. This self-extractable file will extract the compressed data into a temporary folder and execute the main ruby script (ex. `test.rb`).

As this is based on Ruby Traveler (by Phusion), which seems to be a stalled project, we are locked to the only versions they support – the latest one is 2.2.2. :(

::: tip
If you want to use different Ruby versions, **other than 2.2.2**, I recommend adapting this script to zw693's Traveling Ruby, which supports **ALL Ruby versions**:
[https://github.com/zw963/traveling-ruby](https://github.com/zw963/traveling-ruby)
:::

---

## Part I: Standalone Ruby

### Your ruby version should be `2.2.2`, 64 bits

```bash
echo $RUBY_VERSION
ruby-2.2.2
```

::: danger
If your version is different, please install the 2.2.2 (e.g. `rvm use 2.2.2`).
**This will NOT work with 2.2.0, 2.2.3, 2.1, etc.**
:::

### Duplicate the project folder, naming it as "app"

```bash
# ~/hello/
cd ..
cp -r -pa hello app

cd hello
```

### In the project folder, create a `.package/payload/lib/ruby` sub-folder

```bash
# ~/hello/
mkdir -p .package/payload/lib/ruby
```

### Move the "app" folder to `.package/payload/lib`

```bash
# ~/hello/
mv ../app .package/payload/lib
tree -a
    .
    ├── .package
    │   └── payload
    │       └── lib
    │           ├── app
    │           │   └── test.rb
    │           └── ruby
    └── test.rb
```

### Download ruby traveler 2.2.2 64 bits (5.6M), and unzip it on `.package/payload/lib/ruby`

```bash
# ~/hello/
cd .package/payload/lib/ruby

# ~/hello/.package/payload/lib/ruby/
wget http://d6r77u77i8pq3.cloudfront.net/releases/traveling-ruby-20150715-2.2.2-linux-x86_64.tar.gz
tar -xf traveling-ruby-20150715-2.2.2-linux-x86_64.tar.gz
rm traveling-ruby-20150715-2.2.2-linux-x86_64.tar.gz
```

### Go back to `.package/payload/`

```bash
# ~/hello/.package/payload/lib/ruby/
cd ../..
pwd
    ~/hello/.package/payload
```

### Create a wrapper script (name it as `installer.sh`)

```bash
# ~/hello/.package/payload/
nano installer.sh
```

```bash
#!/bin/bash
set -e

# Figure out where this script is located.
SELFDIR="`dirname \"$0\"`"
SELFDIR="`cd \"$SELFDIR\" && pwd`"

## GEMFILE
if [ -f "$SELFDIR/lib/vendor/Gemfile" ]
then
  # Tell Bundler where the Gemfile and gems are.
  export BUNDLE_GEMFILE="$SELFDIR/lib/vendor/Gemfile"
  unset BUNDLE_IGNORE_CONFIG

  # Run the actual app using the bundled Ruby interpreter, with Bundler activated.
  exec "$SELFDIR/lib/ruby/bin/ruby" -rbundler/setup "$SELFDIR/lib/app/test.rb"
else
  exec "$SELFDIR/lib/ruby/bin/ruby" "$SELFDIR/lib/app/test.rb"
fi
```

```bash
# ~/hello/.package/payload/
chmod +x installer.sh
```

Replace the `exec` lines with your actual command to start the application. Eg. for Rails apps, it should be:
`RAILS_ENV=production exec "$SELFDIR/lib/ruby/bin/ruby" -rbundler/setup "$SELFDIR/lib/app/bin/rails" server`

::: tip
The previous script is based on the "traveling ruby" tutorial. If you want to understand this process better, you can follow the official "traveling ruby" instructions.
:::

---

## Part II: Gemfile

If your project has a Gemfile, you need to follow these extra steps:

### Create a `tmp` folder on `.package/payload/lib`

```bash
# ~/hello/.package/payload/
cd lib

# ~/hello/.package/payload/lib/
mkdir tmp
cd tmp
```

### Copy the `Gemfile` to `tmp`

```bash
# ~/hello/.package/payload/lib/tmp/
cp ../app/Gemfile* .
```

### Download gems into the `lib/vendor` folder

```bash
# ~/hello/.package/payload/lib/tmp/
BUNDLE_IGNORE_CONFIG=1 bundle install --path ../vendor --without development
```

### Delete `tmp` folder

```bash
# ~/hello/.package/payload/lib/tmp/
cd ..
rm -Rf tmp
```

### [Optional] Delete gem's cache in the `vendor` folder

```bash
# ~/hello/.package/payload/lib/
rm -f vendor/*/*/cache/*
```

### Copy the `Gemfile` to the `vendor` folder

```bash
# ~/hello/.package/payload/lib/
cp app/Gemfile* vendor/
```

### Create a bundler config
```bash
# ~/hello/.package/payload/lib/
mkdir vendor/.bundle/
cd vendor/.bundle/

# ~/hello/.package/payload/lib/vendor/.bundle/
nano config
```

```bash
BUNDLE_PATH: .
BUNDLE_WITHOUT: development
BUNDLE_DISABLE_SHARED_GEMS: '1'
```

---

## Part III: Pack everything as a single self-extract file

This part is based on [Jeff Parent's article](https://www.linuxjournal.com/node/1005818).

### Create a script to decompress everything

```bash
# ~/hello/.package/
nano decompress.sh
```

The `.package/decompress.sh`:

```bash
#!/bin/bash
export TMPDIR=`mktemp -d /tmp/selfextract.XXXXXX`

ARCHIVE=`awk '/^__ARCHIVE_BELOW__/ {print NR + 1; exit 0; }' $0`

tail -n+$ARCHIVE $0 | tar -xz -C $TMPDIR

CDIR=`pwd`
cd $TMPDIR
./installer.sh

cd $CDIR
rm -rf $TMPDIR

exit 0

__ARCHIVE_BELOW__
```

### Package builder

```bash
# ~/hello/.package/
nano build.sh
```

The `.package/build.sh`:

```bash
#!/bin/bash
cd payload
tar cf ../payload.tar ./*
cd ..

if [ -e "payload.tar" ]; then
    gzip payload.tar

    if [ -e "payload.tar.gz" ]; then
        cat decompress.sh payload.tar.gz > output.sh
    else
        echo "payload.tar.gz does not exist"
        exit 1
    fi
else
    echo "payload.tar does not exist"
    exit 1
fi

chmod +x output.sh
echo "Self-extract file created"
exit 0
```

```bash
# ~/hello/.package/
chmod +x decompress.sh
chmod +x build.sh
./build.sh
    Self-extract file created
```

::: success
And that's it. You can now rename and distribute the generated "output.sh" file :)
:::
