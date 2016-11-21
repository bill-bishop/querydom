# querydom
Command-Line DOM Querying, for easy querying & chaining with other command line utilities. 

querydom uses querySelector syntax, or what you're used to from CSS or jQuery.

### Installation
    $ npm install -g querydom
    
### Usage

You can easily pipe HTML to the `querydom` command:

    $ curl -s http://www.google.com | querydom title                                # "Google Search"
    
    $ echo '<div class="example">Hello, World!</div>' | querydom 'div.example'      # "Hello, World!" 

You can also pass an HTML string as the first argument:

    $ querydom '<textarea>Success</textarea>' textarea      # "Success"
