// Smooth scroll and navbar toggle (vanilla JS)
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for nav links
    document.querySelectorAll('.navbar .nav-link').forEach(link => {
        link.addEventListener('click', function (event) {
            const hash = this.hash;
            if (hash && hash !== '') {
                const target = document.querySelector(hash);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Update the URL hash after animation (approx 700ms)
                    setTimeout(() => {
                        history.pushState(null, '', hash);
                    }, 700);
                }
            }
        });
    });

    // Navbar toggle (hamburger)
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.querySelector('ul.nav');
    if (navToggle) {
        // ensure ARIA defaults
        if (!navToggle.hasAttribute('aria-expanded')) navToggle.setAttribute('aria-expanded', 'false');
        if (!navToggle.hasAttribute('aria-controls')) {
            if (navList && navList.id) navToggle.setAttribute('aria-controls', navList.id);
            else if (navList) {
                navList.id = navList.id || 'site-nav';
                navToggle.setAttribute('aria-controls', navList.id);
            }
        }

        navToggle.addEventListener('click', function () {
            this.classList.toggle('is-active');
            if (navList) navList.classList.toggle('show');
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
        });
    }
});
