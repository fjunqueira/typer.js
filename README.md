# typer.js
Typing effect for your web pages

I wrote this small script to use on my web page and thought it might be useful to someone else :)

You can check it out at [fjunqueira.github.io](https://fjunqueira.github.io)

Example program:
```HTML
<html>

<head>
    <title>Example</title>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/fjunqueira/typer.js/5e22b17fd7ce09ebff9ae25c0530c1e639c45293/typer.js"></script>
    <script>
        $(() => {
            typer.type(20, $("<div style='color:#0000FF'><h3>This is a heading</h3><p>This is a paragraph.</p></div>"), $("#console"));
        });
    </script>
</head>

<body>
    <div id="console"></div>
</body>

</html>
```
