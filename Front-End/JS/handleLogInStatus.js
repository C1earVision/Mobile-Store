const signIn = document.getElementById('signIn')
const signUp = document.getElementById('signUp')
const signOut = document.getElementById('signOut')
const userProfile = document.getElementById('userProfile')

if(localStorage.getItem('token')){
  signOut.style.display = 'block'
  userProfile.style.display = 'block'
}else{
  signIn.style.display = 'block'
  signUp.style.display = 'block'
}

signOut.addEventListener('click',()=>{
  localStorage.clear()
  location.reload()
})

