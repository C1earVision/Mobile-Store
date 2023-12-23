let stars = document.querySelectorAll(".clickable");

stars.forEach((star, index) => {
  star.addEventListener("mouseenter", function() {
    console.log(`Mouse entered star ${index + 1}`);
    
    // to Highlight stars before selected star
    for (let i = 0; i <= index; i++) {
      stars[i].style.filter = `invert(0)`;
    }
    // to Greyout stars after selected star
    for (let i=index+1;i<stars.length;i++){
      stars[i].style.filter = `invert(.5)`;
    }
  });
});