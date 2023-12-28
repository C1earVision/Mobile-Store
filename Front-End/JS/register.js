const form = document.getElementById('form')


form.addEventListener('submit', async function(e){
    e.preventDefault();
    let formData = new FormData(form);
    formData = [...formData] // array that contains 5 arrays
    formData = [formData[0][1], formData[1][1], formData[2][1]] // array with name, email and pass value only
    const data = {name:formData[0], email:formData[1], password: formData[2]}
    const user = await axios.post("https://mobilestoreapi-eo3f.onrender.com/api/v1/auth/register", data)
    .catch((err)=>console.log(err))
    await sendMail(formData[0], formData[1])
    localStorage.setItem("token", user.data.token);
    localStorage.setItem("admin", user.data.user.admin);
    localStorage.setItem("name", user.data.user.name);
    localStorage.setItem("id", user.data.user._id); 
    localStorage.setItem("id", user.data.user.email); 
    document.location = '/Front-End/index.html'
})




async function sendMail(name, email){
    (function (){
      emailjs.init("SabE1f0DV1WXWiRjt");
    })();
  
    emailjs.send("service_yf00xvi","template_feg8cwq",{
        to_name: name,
        email: email,
    }).catch((err)=>console.log(err))
}
