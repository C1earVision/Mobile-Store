const form = document.getElementById('add-form')

form.addEventListener('submit', async function(e){
  e.preventDefault();
  let formData = new FormData(form);
  formData = [...formData]
  console.log(formData)
}) 