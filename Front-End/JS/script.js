ScrollReveal({
    reset: true,
    distance: '150px',
    duration: 1500,
    delay: 20,
});

ScrollReveal().reveal('.home-content h1 ,.home-content h3 ,.new-content h1 ,.used-content h1', { origin: 'top' });
ScrollReveal().reveal('.home-content p ,.home-content h2 ', { origin: 'bottom' });
  ScrollReveal().reveal('.Lefth  ', { origin: 'left' });
  ScrollReveal().reveal(' .Righh ', { origin: 'right' });
  
  const typed = new Typed('.multi-text', {
    strings: ['Unleash Innovation, Embrace Quality.'],
    typeSpeed: 150,
    backDelay: 2000,
    backSpeed: 10,
    loop:true
  });


// done by elmohamady
function createSlick(){  
  $(".slider").not('.slick-initialized').slick({
    centerMode: true,
      autoplay: true,
      dots: true, 
        arrows: true,
      slidesToShow: 3,
      responsive: [{ 
          breakpoint: 768,
          settings: {
              dots: false,
              arrows: false,
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1
          } 
      }]
  }); 

} 
createSlick();
$(window).on( 'resize', createSlick );

