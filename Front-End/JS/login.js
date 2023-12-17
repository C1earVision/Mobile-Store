const form = document.getElementById('form')
const error_div = document.getElementById('error')


form.addEventListener('submit', async function(e){
    e.preventDefault();
    let formData = new FormData(form);
    formData = [...formData] // array that contains 4 arrays
    const data = {email:formData[0][1], password: formData[1][1]}
    const user = await axios.post("https://mobilestoreapi-eo3f.onrender.com/api/v1/auth/login", data)
    .catch((err)=>error_div.innerHTML = err.response.data.msg) 
    localStorage.setItem("token", user.data.token);
    localStorage.setItem("admin", user.data.user.admin);
    localStorage.setItem("id", user.data.user._id);
    localStorage.setItem("img", user.data.user.img);
    document.location = '/Front-End/index.html'
})




