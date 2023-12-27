{/* <div class="d-flex flex-row gap-5">
<h6>Samsung z flip 2</h6>
<h6>1000$</h6>
</div> */}
const form = document.getElementById('form')

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
  console.log(productData)
  let products = productData.map(async (product)=>{
    const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products/${product[0]}?used=${product[1]}`).catch((err)=>console.log(err))
    return data
  })
  Promise.all(products).then(function(results) {
    addCartDetails(results)
  })
}

function addCartDetails(products){
  const cart_total = document.getElementById('cart-total')
  let total = 0
  console.log(products)
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
