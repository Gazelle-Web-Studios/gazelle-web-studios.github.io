function addAnimationClasses() {
  // Add animation classes on scroll
  const observerOptions = {
      threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, observerOptions);

  // Observe all sections except hero
  document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
}

// Image Slider
function setupImageSlider() {
  const slides = document.querySelectorAll('.headerslide');
  if(slides.length === 0){
    return;
  }
  let currentSlide = 0;

  function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }

  // Change slide every 5 seconds
  setInterval(nextSlide, 5000);
}

// Testimonials Rotation
function setupTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial');
  if(testimonials.length === 0){
    return;
  }
  let currentTestimonial = 0;

  function showTestimonial(index) {
      testimonials.forEach(testimonial => testimonial.classList.remove('active'));
      testimonials[index].classList.add('active');
  }

  function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
  }

  // Change testimonial every 7 seconds
  setInterval(nextTestimonial, 7000);
}

// Smooth Scroll
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
}

// Initialize all features when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupImageSlider();
  setupTestimonials();
  setupSmoothScroll();
});

