class Typer {

    constructor(typingSpeed, content, output) {

        this.typingSpeed = typingSpeed;

        this.parseHtml(Array.from(content), output);
    };

    makePromise(node, output) {

        if (node.nodeType == 1) // element 
        {
            return new Promise((resolve) => {
                var tag = $(node.outerHTML.replace(node.innerHTML, ""));
                tag.appendTo(output);

                if (tag.attr("wait"))
                    return new Promise(resolve => setTimeout(resolve, Number(tag.attr("wait")))).then(() => { resolve(tag); })
                else
                    resolve(tag);
            });

        } else if (node.nodeType == 3) // text
        {
            return this.type(node, output, 0);
        } else {
            console.warn("Unknown node type");
        }
    }

    parseHtml(nodes, output) {
        return nodes.reduce((previous, current) => previous
            .then(() => this.makePromise(current, output)
                .then((output) => this.parseHtml(Array.from(current.childNodes), output))), Promise.resolve());
    }

    type(node, output, textPosition) {
        var textIncrement = textPosition + 1;

        var substring = node.data.substring(textPosition, textIncrement);

        var speed = Number(output.attr("speed") || this.typingSpeed);

        if (substring !== "") {
            return new Promise(resolve => setTimeout(resolve, speed))
                .then(() => output.append(substring))
                .then(() => this.type(node, output, textIncrement));
        }

        return Promise.resolve(output);
    }
}