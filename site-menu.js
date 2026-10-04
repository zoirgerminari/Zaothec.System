document.querySelectorAll('.page-header').forEach((header) => {
  const button = header.querySelector('.menu-toggle');
  const nav = header.querySelector('.site-nav');

  if (!button || !nav) return;

  button.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});
