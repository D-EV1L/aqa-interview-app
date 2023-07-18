document.querySelector('#clear-all').addEventListener('click', event => {
    var result = confirm("Ви впевнені що хочете видалити усі результати?");
    if (result) {
        var checkboxes = document.querySelectorAll('.question [type=checkbox]');
        checkboxes.forEach(checkbox => checkbox.checked = false);

        var container = document.getElementById('results');
        container.style.display = 'none';
    }
});

document.querySelector('#expand-all').addEventListener('click', event => {
    var buttons = document.querySelectorAll('.question button.expand[aria-expanded=false]');
    buttons.forEach(button => button.click());
});

document.querySelector('#collapse-all').addEventListener('click', event => {
    var buttons = document.querySelectorAll('.question button.expand[aria-expanded=true]');
    buttons.forEach(button => button.click());
});

document.querySelector('#submit-all').addEventListener('click', event => {
    var correctAnswers = document.querySelectorAll('.question:has([type=checkbox][id^=correct]:checked)');
    var halfAnswers = document.querySelectorAll('.question:has([type=checkbox][id^=half]:checked)');
    var wrongAnswers = document.querySelectorAll('.question:has([type=checkbox][id^=wrong]:checked)');

    var allCount = correctAnswers.length + halfAnswers.length + wrongAnswers.length;

    var correctScore = correctAnswers.length;
    var halfScore = halfAnswers.length / 2;

    var score = (correctScore + halfScore) / allCount * 100;
    score = Math.round(score * 10) / 10;

    if (Number.isNaN(score)) {
        score = 0;
    }

    var container = document.getElementById('results');
    var scoreElement = container.querySelector('.score');

    scoreElement.textContent = score;
    container.style.display = 'flex';

    var wrongAreas = new Set();
    wrongAnswers.forEach(q => wrongAreas.add(q.querySelector('span.area').textContent));
    var halfAreas = new Set();
    halfAnswers.forEach(q => {
        var text = q.querySelector('span.area').textContent;
        if (wrongAreas.has(text)) return;
        halfAreas.add(text);
    });

    if (halfAreas.size > 0) {
        var html = Array.from(halfAreas).map(a => "<li>" + a + "</li>").join('\n');
        container.querySelector('.re-learn ul').innerHTML = html;
        container.querySelector('.re-learn').style.display = 'block';
    } else {
        container.querySelector('.re-learn').style = null;
    }

    if (wrongAreas.size > 0) {
        var html = Array.from(wrongAreas).map(a => "<li>" + a + "</li>").join('\n');
        container.querySelector('.learn ul').innerHTML = html;
        container.querySelector('.learn').style.display = 'block';
    } else {
        container.querySelector('.learn').style = null;
    }

    container.scrollIntoView({ block: 'start', behavior: 'smooth' });
});