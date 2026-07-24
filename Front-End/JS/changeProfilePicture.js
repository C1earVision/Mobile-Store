const img = document.getElementsByClassName('profile-img')
const pathname = window.location.pathname

// Determine if we are at the root homepage (either / or /index.html)
const isHomepage = pathname === '/' || pathname.endsWith('/index.html') || pathname === '';

const savedImg = localStorage.getItem('img')
const hasSavedImg = savedImg && savedImg !== 'undefined' && savedImg !== 'null'

const defaultImg = isHomepage ? "./media/logo.jpg" : "../media/logo.jpg"
const imgSrc = hasSavedImg ? savedImg : defaultImg

if (img.length > 0) {
  img[0].src = imgSrc
}
if (img.length > 1) {
  img[1].src = imgSrc
}

