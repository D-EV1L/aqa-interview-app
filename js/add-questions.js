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

import questions from '../questions.json' assert {type: 'json'};
var template = document.querySelector('#questionnaire .question-wrapper').outerHTML;

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

document.querySelector("#questionnaire").innerHTML = output;
hljs.highlightAll()