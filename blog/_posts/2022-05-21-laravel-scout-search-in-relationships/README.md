---
title: "Laravel Scout - Searching in relationships"
date: 2022-05-21
tags: ['PHP', 'Laravel', 'scout']
author: Daniel Loureiro
---
Let's see how to search in the parent's fields using Laravel Scout and the database driver.
<!-- more -->

Let's say you have this relationship: `users` x `cats`. Each user has many cats (a "one-to-many" relationship):

```php
class User extends Model
{
    public function cats()
    {
        return $this->hasMany(Cat::class);
    }
}
```

```php
class Cat extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

Both models (users and cats) have a `name` field.

Let's say we want to get all cats with `bob` in their names, using Laravel's Scout.

The standard solution is to add this to the `Cat.php` model:
```php
// Cat.php
use Searchable;

/**
  * Get the indexable data array for the model.
  *
  * @return array
  */
public function toSearchableArray()
{
    return [
        'name' => $this->name,
    ];
}
```

And we search with `Cat::search('bob')->get()`.

This solution works well, but what if we want to search in the `user` fields?

## The problem

Let's say we want to get cats owned by people with `bob` in their names.

If you add this to the "Cat" model:
```php
// Cat.php
use Searchable;

/**
  * Get the indexable data array for the model.
  *
  * @return array
  */
public function toSearchableArray()
{
    // we only need to return keys for the database driver
    return [
        'name' => '', // cat's name
        'users.name' => '', // owner's name
    ];
}
```

It won't work. You will get this exception:
```
SQLSTATE[42S22]: Column not found: 1054 Unknown column 'users.name' in 'where clause'

SQL:
select `cats`.*
from `cats`
where (`cats`.`name` like %bob% or `users`.`name` like %bob%)
```

Clearly, the SQL is missing the `users` table. But how to add it?

Doing a `Cat::join(...)->search('bob')` will throw an exception, same for `Cat::search(...)->join(...)`.

The question is: **How to search in the parent attributes?** And by "parent" I mean the "belongsTo" model.

## Solution

The `query` method allows for modifing the search query. Use it to inject a `join` clause:

```php
Cat::search('bob')->query(function ($builder) {
    $builder->join('users', 'cats.user_id', '=', 'users.id');
})->get();
```

This generates the proper query:
```sql
SELECT `cats`.*
FROM `cats`
INNER JOIN `users` on `cats`.`genre_id` = `users`.`id`
WHERE (`cats`.`name` LIKE '%bob%' or `users`.`name` LIKE '%bob%')
ORDER BY `id` desc
```

## Automatically adding the JOIN clause on all searches

To avoid having to write `->join(...)` on every search call, we can make Scout automatically add the JOIN:

```php
// Cat.php
/**
 * Overrides the "search" method to inject a `join` to the relationships.
 */
use Searchable {
    Searchable::search as parentSearch;
}

/**
 * Perform a search against the model's indexed data.
 *
 * @param  string  $query
 * @param  \Closure  $callback
 * @return \Laravel\Scout\Builder
 */
public static function search($query = '', $callback = null)
{
    return static::parentSearch($query, $callback)->query(function ($builder) {
        $builder->join('users', 'cats.user_id', '=', 'users.id');
    });
}
```

Now, we just call `Cat::search('bob')->get()` to search for cats named "bob" or with owners named "bob".


## Final code

```php
class Cat extends Model
{
    /**
     * Overrides the "search" method to inject a `join` to the relationships.
     */
    use Searchable {
        Searchable::search as parentSearch;
    }

    /**
     * Get the indexable data array for the model.
    *
    * @return array
    */
    public function toSearchableArray()
    {
        // no need to return values as the database engine only uses the array keys
        return [
            'name' => '', // cat's name
            'users.name' => '', // owner's name
        ];
    }

    /**
     * Perform a search against the model's indexed data.
     *
     * @param  string  $query
     * @param  \Closure  $callback
     * @return \Laravel\Scout\Builder
     */
    public static function search($query = '', $callback = null)
    {
        return static::parentSearch($query, $callback)->query(function ($builder) {
            $builder->join('users', 'cats.user_id', '=', 'users.id');
        });
    }

    /**
     * Relationships
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

And search with:
```php
Cat::search('bob')->get();
```
