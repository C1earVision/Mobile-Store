const form = document.getElementById('form')


form.addEventListener('submit', async function(e){
    e.preventDefault();
    let formData = new FormData(form);
    formData = [...formData] // array that contains 4 arrays
    formData = [formData[0][1], formData[1][1]] // array that email and pass value only
    const data = {email:formData[0], password: formData[1]}
    const user = await axios.post("https://mobilestoreapi-eo3f.onrender.com/api/v1/auth/register", data)
    .catch(err=>console.log(err))
    localStorage.setItem("token", user.data.token);
    localStorage.setItem("admin", user.data.user.admin); 
    document.location = '/Front-End/index.html'
})