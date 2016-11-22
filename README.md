# querydom
Command-Line DOM Querying, for easy querying & chaining with other command line utilities. 

## Installation
    $ npm install -g querydom
    
## Usage
querydom uses querySelector syntax, or what you're used to from CSS or jQuery.

You can easily pipe HTML to the `querydom` command:

    $ curl -s http://www.google.com | querydom title
    > "Google Search"
    
    $ echo '<div class="example">Hello, World!</div>' | querydom 'div.example'
    > "Hello, World!" 

You can also pass an HTML string as the first argument:

    $ querydom '<textarea>Success</textarea>' textarea
    > "Success"
    
### Operations

You can supply jQuery-like operations, and the program will output the result. The default operation if none is supplied is `--text`, so the program by default behaves like `jQuery(selector).text()`

Equivalent to `$('input').attr('name')`:

    $ echo '<input name="user" value="john">' | querydom input --attr=name
    > "user"

Equivalent to `$('input').val`:

    $ echo '<input name="user" value="john">' | querydom 'input' --val
    > "john"

#### Chaining
Chaining works as well. Below is the equivalent to `$('span').parent().find('span').text()`:

    $ echo '<div><span>foobar</span></div>' | querydom span --parent --find=span --text
    > "foobar"
