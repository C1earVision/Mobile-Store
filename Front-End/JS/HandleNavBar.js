const nav_bar = document.getElementById('nav-bar')
const top_section = document.getElementById('scroll')
const navObserver = new IntersectionObserver((entries, observer)=>{
  const entry = entries[0];
  if(!entry.isIntersecting){
    nav_bar.classList.add('bg-dark')
  }else{
    nav_bar.classList.remove('bg-dark')
  }
}, {})
navObserver.observe(top_section)