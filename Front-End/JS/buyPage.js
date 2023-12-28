{/* <div class="d-flex flex-row gap-5">
<h6>Samsung z flip 2</h6>
<h6>1000$</h6>
</div> */}
const form = document.getElementById('form')
let allProducts = null

window.onload = async ()=>{
  await getCartDetails()
}

async function getCartDetails(){
  var urlParams = new URLSearchParams(window.location.search);
  const product_ids = urlParams.getAll('product_id')
  const used = urlParams.getAll('used')
  let productData = []
  for(let i=0;i<product_ids.length;i++){
    productData.push([product_ids[i],used[i]])
  }
  let products = productData.map(async (product)=>{
    const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products/${product[0]}?used=${product[1]}`).catch((err)=>console.log(err))
    return data
  })
  Promise.all(products).then(function(results) {
    addCartDetails(results)
    allProducts = results
    for(let i=0;i<allProducts.length;i++){
      allProducts[i] = {name: allProducts[i].data.product.name, price: allProducts[i].data.product.price, id:allProducts[i].data.product._id, createdBy:allProducts[i].createdBy}
    }
  })
  
}

function addCartDetails(products){
  const cart_total = document.getElementById('cart-total')
  let total = 0
  products.map((product)=>{
    total += product.data.product.price
    const item = document.createElement('div')
    item.classList.add('d-flex')
    item.classList.add('flex-row')
    item.classList.add('gap-5')
    item.innerHTML = `<h6>${product.data.product.name}</h6>
    <h6>${product.data.product.price}$</h6>`
    form.insertBefore(item, cart_total)
  })
  cart_total.innerHTML = `Total ${total}$`
}


form.addEventListener('submit', async function(e){
  e.preventDefault();
  let formData = new FormData(form);
  formData = [...formData]
  var urlParams = new URLSearchParams(window.location.search);
  const product_ids = urlParams.getAll('product_id')
  const used = urlParams.getAll('used')
  const data = []
  for(let i=0; i<product_ids.length;i++){
    data.push({
      user_id:localStorage.getItem('id'),
      used:used[i],
      address:{street:formData[0][1],city:formData[1][1],state:formData[2][1],zip_code:formData[3][1]},
      items:product_ids[i]
    })
  }
  for(let i=0; i<product_ids.length;i++){
    await axios.
    request({
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: data[i],
      method: "POST",
      url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/checkout?used=${used[i]}`,
    }).then(async (res)=>{
      const user = await axios.
      request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        method: "GET",
        url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/getUser`,
      })
      console.log(user.data.user.phoneNumber)
      const purchasedUnitsString = `
      Name: ${allProducts[i].name},
      Price: ${allProducts[i].price} $,
      ID: ${allProducts[i].id}
      ${used[i] === 'true'?`used:${used[i]},
                 PhoneNumber: ${localStorage.getItem('phoneNumber')}`:''}`
      const addressString = `
            City: ${data[0].address.city},
            State: ${data[0].address.state},
            Street: ${data[0].address.street},
            Zip_code: ${data[0].address.zip_code}`
      // sendMail(localStorage.getItem('name'), addressString, purchasedUnitsString, localStorage.getItem('email'))
      console.log(res)
    }).catch((res)=>{
      console.log(res)
    })
  }
  alert('Your order has been made')
  async function sendMail(name, address, purchasedUnits, fromEmail){
    (function (){
      emailjs.init("SabE1f0DV1WXWiRjt");
    })();
  
    emailjs.send("service_yf00xvi","template_r9q43gd",{
        name,
        purchasedUnits,
        address,
        fromEmail
    }).catch((err)=>console.log(err))
  }
})
