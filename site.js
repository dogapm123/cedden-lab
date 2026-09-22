(() => {
  const button = document.getElementById('menu-button');
  const dialog = document.getElementById('mobile-menu');
  const closeButton = document.getElementById('menu-close');
  if (!button || !dialog || !closeButton) return;
  const close = () => dialog.close();
  button.addEventListener('click', () => {
    dialog.showModal();
    button.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
  });
  closeButton.addEventListener('click', close);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }
  });
  dialog.addEventListener('close', () => {
    button.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    button.focus();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && dialog.open) close();
  });
  const oldSections = {about:'cv',research:'research',publications:'papers',preprints:'preprints',news:'news',awards:'awards',dsrip:'rnai'};
  const oldSection = location.hash.slice(1);
  if ((location.pathname.endsWith('/index.html') || location.pathname.endsWith('/')) && oldSections[oldSection]) {
    location.replace(oldSections[oldSection] + '.html');
  }
})();
