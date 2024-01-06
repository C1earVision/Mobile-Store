const profile_container = document.getElementById('profile-container')
const profilePicture = document.getElementById('img')



window.onload = async ()=>{
  const user = await axios
  .request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/getUser`,

  })
  localStorage.setItem("img", user.data.user.img);
  const profile_content = document.createElement('div')
  profile_content.classList.add("profile-content")
  profile_content.innerHTML = `
    <div class="profile-image">
        <img src="${user.data.user.img || "/Front-End/media/logo.jpg"}" alt="/Front-End/media/logo.jpg" id="img">
    </div>
    <input type="file" id="fileInput" style="display:none">

    <label id="profilePicture" for="fileInput" class="custom-file-input-label">
      <span class="custom-file-input">Change Profile Picture</span>
    </label>
    <div class="profile-info">
        <h1>${user.data.user.name}</h1>
        <p class="email">Email: ${user.data.user.email}</p>
        <div class='butons_container'>
          <div class="container">
              <a href="./AddProductPage.html?used=true"><button type="button" ><i class="fa-solid fa-mobile-screen-button"></i>  Sell your device</button></a>
          </div>
          <div class="container">
              ${localStorage.getItem('admin') === 'true' ? '<a href="./AddProductPage.html"><button type="button" ><i class="fa-solid fa-plus"></i>  Add Product</button></a>' : ''}
          </div>
          <div class="container">
              ${localStorage.getItem('admin') === 'true' ? '<button onclick="generateReport(event)" type="button" >Download report</button>' : ''}
          </div>
        </div>

    </div>`
    profile_container.appendChild(profile_content)
    const profilePictureInput = document.getElementById('fileInput')
    let fileSizeCheck = null
    profilePictureInput?.addEventListener('change', async (e)=>{
      const file = fileInput.files[0];
      const maxFileSizeInMB = 0.2;
      const maxFileSizeInKB = 1024 * 1024 * maxFileSizeInMB;
    
      if (file.size > maxFileSizeInKB) {
        alert(`Please select a file that is 200 KB or less.`);
        fileSizeCheck = false
        return
      }else{
        fileSizeCheck = true
      } 
      const profilePictureData = await convertFile(e.target.files[0])
      const data = await axios
      .request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PATCH",
        url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/getUser`,
        data: {img:profilePictureData}
      })
      profilePicture.src = profilePictureData
    })
}


const convertFile = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  }).then((res) => fileData = res);
};

async function generateReport(e){
  const doc = await axios.request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
    responseType: 'blob',
    url: `http://localhost:3000/api/v1/user/generateReport`,
  }).then((res)=>{
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  })

}


