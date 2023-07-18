function createId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

var template = document.querySelector('#questionnaire .question-wrapper').outerHTML;

fetch("../questions.json")
    .then(response => response.text())
    .then(jsonString => JSON.parse(jsonString))
    .then(questions => {
        let output = "";
        questions.forEach(question => {
            let html = template;
            html = html.replace("{{area}}", question.area);
            html = html.replace("{{title}}", question.title);
            html = html.replace("{{answer}}", question.answer);
            if (question.code) {
                html = html.replace("{{code}}", question.code);
                html = html.replace("{{style}}", "");
            } else {
                html = html.replace("{{code}}", "");
                html = html.replace("{{style}}", ' style="display: none;"');
            }
            html = html.replaceAll("{{id}}", createId(10));
            output += html;
        });
        return output;
    })
    .then(html => {
        document.querySelector("#questionnaire").innerHTML = html;
        hljs.highlightAll();
    });