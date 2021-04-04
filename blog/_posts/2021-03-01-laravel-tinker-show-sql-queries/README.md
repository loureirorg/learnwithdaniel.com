---
title: "Show SQL queries on Tinker"
date: 2021-03-01
tags: ['PHP', 'Laravel', 'Tinker']
author: Daniel Loureiro
---
If you want to echo the SQL queries being executed on Tinker:
<!-- more -->

Add `.psysh.php` to your project:

```php
<?php
DB::listen(function ($query) {
    dump("[{$query->time}ms] {$query->sql}");
    if ($query->bindings) {
        dump($query->bindings);
    }
});
```

Now, whenever Tinker executes a query, it logs on screen:
![Tinker showing query](./tinker-sql.png)

## Improved version

If you want this improved version
![SQL with colors](./tinker-sql-improved.png)

Use this snippet instead:

```php
<?php
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Console\Formatter\OutputFormatterStyle;

function generate_color_console() {
    /** Reference: https://symfony.com/doc/current/console/coloring.html */
    $output       = new ConsoleOutput();

    $redStyle     = new OutputFormatterStyle('#ff0000', '', ['bold']);
    $cyanStyle    = new OutputFormatterStyle('cyan', '', ['bold']);
    $purpleStyle  = new OutputFormatterStyle('#9b6bdf', '', ['bold']);
    $yellowStyle  = new OutputFormatterStyle('yellow', '', ['bold']);
    $greenStyle   = new OutputFormatterStyle('green', '', ['bold']);
    $magentaStyle = new OutputFormatterStyle('#ff00ff', '', ['bold']);
    $whiteStyle   = new OutputFormatterStyle('#ffffff', '', []);

    $output->getFormatter()->setStyle('label', $cyanStyle);
    $output->getFormatter()->setStyle('select', $purpleStyle);
    $output->getFormatter()->setStyle('update', $yellowStyle);
    $output->getFormatter()->setStyle('insert', $greenStyle);
    $output->getFormatter()->setStyle('delete', $magentaStyle);
    $output->getFormatter()->setStyle('default', $redStyle);
    $output->getFormatter()->setStyle('params', $whiteStyle);

    return $output;
}

/**
 * Given an INSERT query, return the column name of each `?`.
 *
 * @param string $sql Example:
 *   `INSERT INTO users(id, `name`, created_at) VALUES(?, ?, ?)`
 *
 * @return string[] Example: `['id', 'name', 'date']`
 *
 */
function get_binding_names_from_insert($sql) {
    // Get column names. Ex.: "'id, `name`, created_at'".
    $matches = [];
    $success = preg_match('/INSERT *INTO *[^(]*\(([^)]+)\)/i', $sql, $matches);
    if (0 === $success) {
        return false;
    }
    $names_str = array_pop($matches);

    // Split: ['id, 'name', created_at']
    preg_match_all('/([a-z0-9_]+)/i', $names_str, $matches);

    return array_shift($matches);
}

/**
 * Given a SQL, return the column name of each `?`.
 *
 * @param string $sql Example:
 *   `SELECT * FROM users
 *    WHERE `users`.`id` = ? AND created_at <= ? LIMIT ?`
 *
 * @return string[] Example: `['id', 'created_at', 'LIMIT']`
 *
 */
function get_binding_names_from_expressions($sql) {
    // For each `?`, get the two previous words.
    $matches = [];
    preg_match_all('/([\S]*) *([\S]*) *\?/', $sql, $matches);

    // Sample: ["`users`.`id` = ?", "`users`.`deleted_at` >= ?", " LIMIT ?"]
    $expressions = array_shift($matches);

    // Get the first word of each expression. Sample: ["`users`.`id`", "`users`.`deleted_at`", "LIMIT"]
    $first_words = array_map(function ($str) {
        $words = explode(' ', trim($str), 2);
        return array_shift($words);
    }, $expressions);

    // Extract "column" from "`table`.`column`".
    $names = array_map(function ($str) {
        $matches = [];
        preg_match_all('/`(.*?)`/', $str, $matches);
        $match = array_pop($matches);
        $name = array_pop($match);
        return $name ? $name : $str;
    }, $first_words);

    return $names;
}

$output = generate_color_console();
DB::listen(function ($query) use ($output) {
   // Change reserved words to uppercase (not the full list, just some main ones).
    $reserved = [
        'SELECT ', 'UPDATE ', 'INSERT ', 'DELETE ',
        'BEGIN', 'COMMIT', 'ROLLBACK', ' FROM ',
        ' LEFT JOIN ', ' RIGHT JOIN ', ' FULL JOIN ',
        ' INNER JOIN ', ' OUTER JOIN ', ' JOIN ',
        ' WHERE ', ' LIMIT ', ' ORDER BY ', ' SET ',
        ' UNION ', ' LIKE ', ' IS NULL ', ' IS NOT NULL ',
        'INSERT INTO ', ' IN ', 'CREATE ', 'DROP ',
        'ALTER ', ' VALUES ',
    ];
    $sql = str_ireplace($reserved, $reserved, $query->sql);

    // Each statement type has a different color.
    $statements = ['SELECT', 'UPDATE', 'INSERT', 'DELETE'];
    $words      = explode(' ', trim($sql));
    $first_word = strtoupper(array_shift($words));

    // Wrap SQL in a color tag (ex. <select>, <update>, etc).
    $tag = (in_array($first_word, $statements)) ? $first_word : 'default';
    $tag = strtolower($tag);

    // Margin + "SQL" label + Timing + SQL.
    $str = "  <label>SQL ({$query->time}ms)<label>  <$tag>{$sql}</$tag>";

    // Add Bindings.
    if ($query->bindings) {
        $names = get_binding_names_from_insert($sql);
        if (false === $names) {
            $names = get_binding_names_from_expressions($sql);
        }
        if (false === $names) {
            $names = array_keys($query->bindings);
        }

        $params = [];
        foreach ($query->bindings as $index => $value) {
            $name = $names[$index];
            $params[] = "['$name', '$value']";
        }

        $params_str = join(', ', $params);
        $str = "$str  <params>[$params_str]</params>";
    }

    // Output final string.
    $output->writeln($str);
});
```
