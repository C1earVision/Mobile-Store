{/* <div class="profile-content">

</div> */}


const profile_container = document.getElementById('profile-container')
window.onload = async ()=>{
  const userId = localStorage.getItem('id')
  const user = await axios
  .request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/${userId}`,

  })
  const profile_content = document.createElement('div')
  profile_content.classList.add("profile-content")
  profile_content.innerHTML = `
    <div class="profile-image">
        <img src="/Front-End/media/logo.jpg" alt="Profile Image">
    </div>
    <div class="container">
        <a href="#"><button type="button" >change profile picture</button></a>
    </div>
    <div class="profile-info">
        <h1>${user.data.user.name}</h1>
        <p class="email">Email: ${user.data.user.email}</span></p>
        <div class="container">
            <a href="#"><button type="button" ><i class="fa-solid fa-mobile-screen-button"></i>  Sell your device</button></a>
        </div>
        <div class="container">
            <a href="#"><button type="button" ><i class="fa-solid fa-plus"></i>  Add Prodect</button></a>
        </div>
    </div>`
    profile_container.appendChild(profile_content)
}