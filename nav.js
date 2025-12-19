
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.custom-navbar');
  if (!navbar) return;

  const affixOffset = parseInt(navbar.getAttribute('data-offset-top'), 10) || 20;
  const navLinks = document.querySelectorAll('.navbar .nav-link, .nav .link');
  const sections = Array.from(document.querySelectorAll('section[id], header[id]'));

  // AFFIX (sticky) behavior
  const onScroll = () => {
    if (window.scrollY > affixOffset) {
      navbar.classList.add('affix');
    } else {
      navbar.classList.remove('affix');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // SCROLLSPY using IntersectionObserver
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href === '#' + id || href.endsWith('#' + id)) {
              link.classList.add('active');
              link.setAttribute('aria-current', 'page');
            } else {
              link.classList.remove('active');
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0.25 });

    sections.forEach(s => observer.observe(s));
  }
});
