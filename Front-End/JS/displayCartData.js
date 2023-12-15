const cart = document.getElementById('cart')
const cart_total = document.getElementById('cart-total')
const total_price_div = document.getElementById('total-price')
async function displayCartItems (){
  const products_new = await axios
  .request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/wishlist`,
  })
  const products_used = await axios
  .request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/wishlist?used=true`,
  })
  // products_new.data.products
  let total_price = 0
  products_new.data.products.map((product)=>{
    total_price = total_price + product.price 
    const cart_item = document.createElement('div')
    cart_item.classList.add('cart-item')
    cart_item.innerHTML = `
    <img src="/Front-End/media/logo.jpg" alt="Product 1">
    <div class="item-details">
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <button class="remove-item"> <i class="fa-solid fa-trash-can"></i>  Remove</button>
    </div>`
    cart.insertBefore(cart_item, cart_total)
  })
  total_price_div.innerHTML = `Total: ${total_price} $`
}


displayCartItems()