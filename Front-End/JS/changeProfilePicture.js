const img = document.getElementsByClassName('profile-img')
const path = window.location.href.split('/')
if (path.includes('ProductsPage.html') || path.includes('ProductsPage.html?used=%27true%27')){
  img[0].src = localStorage.getItem('img') === 'undefined' ? "../media/logo.jpg" : localStorage.getItem('img')
  img[1].src = localStorage.getItem('img') === 'undefined' ? "../media/logo.jpg" : localStorage.getItem('img')
}else{
  img[0].src = localStorage.getItem('img') === 'undefined' ? "./media/logo.jpg" : localStorage.getItem('img')
  img[1].src = localStorage.getItem('img') === 'undefined' ? "./media/logo.jpg" : localStorage.getItem('img')
}
