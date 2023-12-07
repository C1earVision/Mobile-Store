const signIn = document.getElementById('signIn')
const signUp = document.getElementById('signUp')
const signOut = document.getElementById('signOut')
const userProfile = document.getElementById('userProfile')

const signIn2 = document.getElementById('signIn2')
const signUp2 = document.getElementById('signUp2')
const signOut2 = document.getElementById('signOut2')
const userProfile2 = document.getElementById('userProfile2')

const drop_down_toggle = document.getElementById('drop-down-toggle')
const drop_down_menu = document.getElementById('drop-down-menu')

let click = true
const toggle_menu = {true:'block',false:'none'}

drop_down_toggle.addEventListener('click',()=>{
  drop_down_menu.style.display = toggle_menu[click]
  click = !click
})

const toggle_filters = document.getElementById('toggle-filters')
const mobile_filters = document.getElementById('mobile-filter')

let filter_click = true
const filters = {true:'block',false:'none'}

toggle_filters.addEventListener('click',()=>{
  mobile_filters.style.display = filters[filter_click]
  filter_click = !filter_click
})

if(localStorage.getItem('token')){
  signOut.style.display = 'block'
  userProfile.style.display = 'block'
  signOut2.style.display = 'block'
  userProfile2.style.display = 'block'
}else{
  signIn.style.display = 'block'
  signUp.style.display = 'block'
  signIn2.style.display = 'block'
  signUp2.style.display = 'block'
}

signOut.addEventListener('click',()=>{
  localStorage.clear()
  location.reload()
})

signOut2.addEventListener('click',()=>{
  localStorage.clear()
  location.reload()
})

