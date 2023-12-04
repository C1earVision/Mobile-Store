ScrollReveal({
    reset: false,
    distance: '1000px',
    duration: 1500,
    delay: 20,
});

ScrollReveal().reveal('.home-content h1 ', { origin: 'top' });
ScrollReveal().reveal('.home-content p', { origin: 'bottom' });
  ScrollReveal().reveal('.home-content h3 ,.Lefth', { origin: 'left' });
  ScrollReveal().reveal('.home-content h2 , .Righh', { origin: 'right' });
  
  const typed = new Typed('.multi-text', {
    strings: ['Unleash Innovation, Embrace Quality.'],
    typeSpeed: 150,
    backDelay: 2000,
    backSpeed: 10,
    loop:true
  });