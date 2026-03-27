const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
const links = document.querySelectorAll('.menu a');
const sections = [...links]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function toggleMenu() {
  if (!menu || !menuToggle) return;

  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

function closeMenu() {
  if (!menu || !menuToggle) return;

  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function setActiveLink() {
  let currentSection = '';
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollPosition >= top && scrollPosition < top + height) {
      currentSection = `#${section.id}`;
    }
  });

  links.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentSection);
  });
}

function handleOutsideClick(event) {
  if (!menu || !menuToggle) return;

  const clickedInsideMenu = menu.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    closeMenu();
  }
}

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

links.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
document.addEventListener('click', handleOutsideClick);
