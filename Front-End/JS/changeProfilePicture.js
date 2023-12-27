const img = document.getElementsByClassName('profile-img')
const path = window.location.href.split('/')

console.log(localStorage.getItem('img'))
if (path.includes('index.html')){
  img[0].src = localStorage.getItem('img') === ('undefined' || 'null') ? "./media/logo.jpg" : localStorage.getItem('img')
  img[1].src = localStorage.getItem('img') === ('undefined' || 'null') ? "./media/logo.jpg" : localStorage.getItem('img')  
}else{
  img[0].src = localStorage.getItem('img') === ('undefined' || 'null') ? "../media/logo.jpg" : localStorage.getItem('img')
  img[1].src = localStorage.getItem('img') === ('undefined' || 'null') ? "../media/logo.jpg" : localStorage.getItem('img')
}
