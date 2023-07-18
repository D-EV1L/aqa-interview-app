function collapseSection(element) {
    element.style.height = 0 + 'px';
    element.setAttribute('data-collapsed', 'true');
}

function expandSection(element) {
    var sectionHeight = element.scrollHeight;
    element.style.height = sectionHeight + 'px';
    element.setAttribute('data-collapsed', 'false');

    element.addEventListener("transitionend", function () {
        element.style.height = 'auto';
    });
}

document.addEventListener('click', function (e) {
    var target = e.target.closest('button.expand');

    if (target) {
        var section = target.parentElement.nextElementSibling;
        var isCollapsed = section.getAttribute('data-collapsed') === 'true';

        if (isCollapsed) {
            expandSection(section);
            target.setAttribute('aria-expanded', true);
        } else {
            collapseSection(section);
            target.setAttribute('aria-expanded', false);
        }
    }
});