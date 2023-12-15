const form = document.getElementById('form')


form.addEventListener('submit', async function(e){
    e.preventDefault();
    let formData = new FormData(form);
    formData = [...formData] // array that contains 5 arrays
    formData = [formData[0][1], formData[1][1], formData[2][1]] // array with name, email and pass value only
    const data = {name:formData[0], email:formData[1], password: formData[2]}
    const user = await axios.post("https://mobilestoreapi-eo3f.onrender.com/api/v1/auth/register", data)
    .catch(err=>console.log(err))
    localStorage.setItem("token", user.data.token);
    localStorage.setItem("admin", user.data.user.admin);
    localStorage.setItem("id", user.data.user._id); 
    document.location = '/Front-End/index.html'
})
