const turnOffOthers = element => {
    var answer = element.id.split('-')[0];
    var id = element.id.split('-')[1];

    if (element.checked) {
        var others = document.querySelectorAll('input[type=checkbox]:not([id^=' + answer + '])[id$="' + id + '"]');
        others.forEach(el => el.checked = false);
    }
}

document.addEventListener('change', function (e) {
    var target = e.target;

    if (!target.matches("input[type=checkbox]")) return;

    turnOffOthers(target);
});

document.addEventListener('click', function (e) {
    var target = e.target;

    var isBtn = target.matches("button.copy-code");
    var isBtnSvg = target.matches("button.copy-code svg");

    if (!(isBtn || isBtnSvg)) return;

    var container = target.parentElement.parentElement;
    if (isBtnSvg) container = container.parentElement;

    var text = container.querySelector('code').textContent;
    navigator.clipboard.writeText(text)
        .then(() => {
            var el = target;
            if (isBtnSvg) el = target.parentElement;
            el = el.querySelector('span');
            el.style.opacity= 1;

            setTimeout(() => {
                el.style.opacity= 0;
              }, 2000);
        })
        .catch((err) => {
            console.error('Error copying text: ', err);
        });
});