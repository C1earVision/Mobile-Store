


const form = document.getElementById('form')


form.addEventListener('submit', async function(e){
  e.preventDefault();
  let formData = new FormData(form);
  formData = [...formData]
  var urlParams = new URLSearchParams(window.location.search);
  const product_ids = urlParams.getAll('product_id')
  const used = urlParams.get('used')
  const data = {
    user_id:localStorage.getItem('id'),
    used:used,
    address:{street:formData[0][1],city:formData[1][1],state:formData[2][1],zip_code:formData[3][1]},
    items:product_ids
  }
  const product = await axios.
  request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: data,
    method: "POST",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/checkout?used=${used}`,
  }).then((res)=>{
    console.log(res)
    // alert('Product added successfully')
  }).catch((res)=>{
    console.log(res)
  })
})
