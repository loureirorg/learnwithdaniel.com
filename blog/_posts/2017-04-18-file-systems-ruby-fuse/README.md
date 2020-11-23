---
title: "Create a Filesystem with Ruby and FUSE"
date: 2017-04-18
tags: ['Ruby', 'FUSE']
author: Daniel Loureiro
---
Let's see how to create a file system (CowFS) with Ruby and FUSE in simple steps.
<!-- more -->

In 5 minutes you will be able to create your own file system.

<div class="youtube">
<iframe title="Tutorial: Create a File System in Ruby" src="https://www.youtube.com/embed/1GiiQtkXCl0?feature=oembed" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="1200" height="900" frameborder="0"></iframe>
</div>

<div class="iframe">
<iframe src="https://docs.google.com/presentation/d/1LiwRushgbJNHhdMrIS_9APJFZ8MI6XYLX5YxXWMSq9w/embed?start=false&amp;loop=false&amp;delayms=3000" allowfullscreen="allowfullscreen" width="960" height="569"></iframe>
</div>

## Commands

```bash
sudo gem install rfusefs
```

## Basic code

```ruby
# main.rb
require 'rfusefs'

class CowFS
  def contents(path)
    ['rose.txt']
  end

  def file?(path)
    path == '/rose.txt'
  end

  def read_file(path)
    "Moo?!\n"
  end
end

cowfs = CowFS.new
FuseFS.start(cowfs, '/mnt/test')
```

Then, run (in one terminal) and test (in another):

```bash
ruby main.rb
```

```bash
ls /mnt/test
  rose.txt
cat /mnt/test/rose.txt
  Moo?!
```

## Binary files

```ruby
# main.rb
def contents(path)
  ['rose.txt', 'bessie.jpg']
end

def read_file(path)
  if path == '/rose.txt'
    "Moo?!\n"
  else
    File.binread('/home/daniel/Pictures/some_picture.jpg')
  end
end
```

## Size / Time

```ruby
# main.rb
def size(path)
  if path == '/rose.txt'
    6
  elsif path == '/bessie.jpg'
    888_000
  else
    raw_read(path).length
  end
end

def times(path)
  if path == '/rose.txt'
    year, month, day, hour, min, sec = [2017, 4, 17, 13, 20, 59.99]
    atime = mtime = ctime = Time.new(year, month, day, hour, min, sec).to_f
    return [atime, mtime, ctime]
  else
    return [0, 0, 0]
  end
end
```

## RAW

```ruby
# main.rb
def raw_open(path, mode, raw)
  {path: path}
end

def raw_read(path, offset, size, raw)
  if raw[:path] == '/rose.txt'
    "Moo?!\n"
  else
    File.binread('/home/daniel/Pictures/some_picture.jpg', size, offset)
  end
end
```

## Compiling

```ruby
# Gemfile
source 'https://rubygems.org' do
  gem 'rfusefs'
end
```

```ruby
# main.rb
FuseFS.mount() { |options| cowfs }
```

```bash
rb2exe main.rb --add=. --daemon -o mount.cowfs
chmod +x mount.cowfs
mv mount.cowfs /usr/sbin
```

## On boot (fstab)

```bash
rb2exe main.rb --add=. --daemon -o mount.cowfs
chmod +x mount.cowfs
mv mount.cowfs /usr/sbin
```

```bash
# /etc/fstab
/usr/sbin/mount.cowfs /mnt/cows fuse user,noauto    0    0
```

---

## Links

- [Full list of methods](https://github.com/lwoggardner/rfusefs/blob/master/lib/fuse/fusedir.rb)
- [List of exceptions/errors](https://linux.die.net/man/3/errno)
