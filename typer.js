var typer = {

    type: function (typingSpeed, content, output) {
        typer.parseHtml(Array.from(content), output, typingSpeed);
    },

    makePromise: function (node, output, typingSpeed) {

        if (node.nodeType == 1) // element 
        {
            return new Promise((resolve) => {
                let tag = $(node.outerHTML.replace(node.innerHTML, ""));
                tag.appendTo(output);

                if (tag.attr("wait"))
                    return new Promise(resolve => setTimeout(resolve, Number(tag.attr("wait")))).then(() => { resolve(tag); })
                else
                    resolve(tag);
            });

        } else if (node.nodeType == 3) // text
        {
            return typer.typeNodeContent(node, output, 0, typingSpeed);
        } else {
            console.warn("Unknown node type");
        }
    },

    parseHtml: function (nodes, output, typingSpeed) {
        return nodes.reduce((previous, current) => previous
            .then(() => typer.makePromise(current, output, typingSpeed)
                .then((output) => typer.parseHtml(Array.from(current.childNodes), output, typingSpeed))), Promise.resolve());
    },

    typeNodeContent: function (node, output, textPosition, typingSpeed) {
        let textIncrement = textPosition + 1;

        let substring = node.data.substring(textPosition, textIncrement);

        let speed = Number(output.attr("speed") || typingSpeed);

        if (substring !== "") {
            return new Promise(resolve => setTimeout(resolve, speed))
                .then(() => output.append(substring))
                .then(() => typer.typeNodeContent(node, output, textIncrement, typingSpeed));
        }

        return Promise.resolve(output);
    }
}