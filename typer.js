class Typer {

    constructor(typingSpeed, file) {

        this.file = file;
        this.typingSpeed = typingSpeed;

        $.get(this.file, (data) => {
            this.parseHtml($(data).toArray(), $("#console"));
        });
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
        var promise = Promise.resolve();

        nodes.forEach((node) => {

            promise = promise.then(() => this.makePromise(node, output).then((output) => {
                return this.parseHtml(node.childNodes, output);
            }));
        });

        return promise;
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