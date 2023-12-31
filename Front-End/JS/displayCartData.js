const cart = document.getElementById('cart')
const cart_total = document.getElementById('cart-total')
const total_price_div = document.getElementById('total-price')
let cartItems = null


async function remove_item(e){
  let parentElement = e.target.parentNode;
  while (parentElement && !parentElement.id) {
    parentElement = parentElement.parentNode;
  }
  const used = parentElement.classList[1]
  const deleted_item = await axios
  .request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "PATCH",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/wishlist/${parentElement.id}?used=${used}`,
  })
  location.reload()
}

async function displayCartItems (){
  
  const products_new = await axios
  .request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/wishlist`,
  }).catch((err)=>console.log(err))
  const products_used = await axios
  .request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/wishlist?used=true`,
  }).catch((err)=>console.log(err))
  console.log(products_new)
  let total_price = 0
  
  const total_products = [...products_new.data.products, ...products_used.data.products]
  cartItems = total_products
  total_products.map((product)=>{
    total_price = total_price + product.price 
    const cart_item = document.createElement('div')
    cart_item.id = `${product._id}`
    cart_item.classList.add('cart-item')
    cart_item.classList.add(`${product.used}`)
    cart_item.innerHTML = `
    <img class="img" src="${product.imges.img_1}" alt="Product 1">
    <div class="item-details">
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <button onclick='remove_item(event)' class="remove-item"> <i class="fa-solid fa-trash-can"></i>  Remove</button>
    </div>`
    cart.insertBefore(cart_item, cart_total)
  })
  total_price_div.innerHTML = `Total: ${total_price} $`
}



async function checkOut(e){
  const product_ids = cartItems.map((product)=>{
    return [product._id, product.used]
  })

  let product_ids_string = ''
  if(product_ids.length > 0){
    product_ids.map(product=>{
      product_ids_string += ('product_id='+ product[0] + `&used=${Boolean(product[1])}&`) 
    })
    window.location.href = `./BuyPage.html?${product_ids_string}`
    return
  }
  alert('No items in your cart')
}


displayCartItems()