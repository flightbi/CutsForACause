const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();

const testimonialSlides = [...document.querySelectorAll('.testimonial-slide')];
const testimonialCurrent = document.querySelector('#testimonial-current');
const testimonialPrevious = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');

if (testimonialSlides.length && testimonialCurrent && testimonialPrevious && testimonialNext) {
  let activeTestimonial = 0;

  const showTestimonial = (index) => {
    activeTestimonial = (index + testimonialSlides.length) % testimonialSlides.length;
    testimonialSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeTestimonial;
      slide.hidden = !isActive;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    testimonialCurrent.textContent = String(activeTestimonial + 1).padStart(2, '0');
  };

  testimonialPrevious.addEventListener('click', () => showTestimonial(activeTestimonial - 1));
  testimonialNext.addEventListener('click', () => showTestimonial(activeTestimonial + 1));
}
