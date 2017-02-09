# typer.js
Typing effect for your web pages

I wrote this small script to use on my web page and thought it might be useful to someone else :)

You can check it out at [fjunqueira.github.io](https://fjunqueira.github.io)

Example program:
```HTML
<html>

<head>
    <title>Example</title>
    <link rel="stylesheet" href="index.css">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/fjunqueira/typer.js/4ba8280e3458d4e1d57e338e3cb9df045d671186/typer.js"></script>
    <script>
        $(() => {
            new Typer(20, $("<div style='color:#0000FF'><h3>This is a heading</h3><p>This is a paragraph.</p></div>"), $("#console"));
        });
    </script>
</head>

<body>
    <div id="console"></div>
</body>

</html>
```
