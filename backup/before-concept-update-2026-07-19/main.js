const topbar = document.querySelector('[data-topbar]');
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');

window.addEventListener('scroll', () => topbar.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-30% 0px -60% 0px' });
sections.forEach(section => observer.observe(section));

document.querySelectorAll('.goal-grid button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.goal-grid button').forEach(item => {
    item.classList.remove('selected');
    item.querySelector('i')?.remove();
  });
  button.classList.add('selected');
  const check = document.createElement('i');
  check.textContent = '✓';
  button.append(check);
}));

const modeButtons = document.querySelectorAll('[data-mode]');
const defaultTimeline = document.querySelector('[data-timeline-default]');
const quantTimeline = document.querySelector('[data-timeline-quant]');
modeButtons.forEach(button => button.addEventListener('click', () => {
  modeButtons.forEach(item => item.classList.toggle('active', item === button));
  const mode = button.dataset.mode;
  const isQuant = mode === 'quant';
  defaultTimeline.hidden = isQuant;
  quantTimeline.hidden = !isQuant;
  if (isQuant) return;
  document.querySelectorAll(`[data-${mode}]`).forEach(item => { item.textContent = item.dataset[mode]; });
}));
