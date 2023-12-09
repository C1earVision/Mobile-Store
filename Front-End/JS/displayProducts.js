const products_container = document.getElementById('card-container')
const price_form = document.getElementById('price-form')
const company_form = document.getElementById('company-form')
const date_form = document.getElementById('date-form')

const price_form_mobile = document.getElementById('price-form-mobile')
const company_form_mobile = document.getElementById('company-form-mobile')
const date_form_mobile = document.getElementById('date-form-mobile')

const search_form = document.getElementById('search-form')
const search_form_2 = document.getElementById('search-form-2')

price_form.addEventListener('click',async (e)=>{
  console.log(e.target.value)
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?sort=${e.target.value}`)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
  data.data.products.map((product)=>{
    const productDiv = document.createElement('div');
    const {name, price, _id:id} = product
    productDiv.innerHTML = `<div onclick="handleClick(event)" class='card' id='${id}'><div class='imgBox'>
    <img src='../media/gerndizer[1]-01.png' alt=''>
    </div>
    <div class='contentBox'>
      <h3>${name}</h3>
      <h2 class='price'>${price}.<small>99</small> $</h2>
      <button class='cart'><i class='fa-solid fa-cart-shopping'></i></button>
      <button class='cart'><a href='#' class='view'>View More</a></button>
    </div></div>`
    products_container.appendChild(productDiv)
  })
  
})

company_form.addEventListener('click',async (e)=>{
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?company=${e.target.value}`)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
  data.data.products.map((product)=>{
    const productDiv = document.createElement('div');
    const {name, price, _id:id} = product
    productDiv.innerHTML = `<div onclick="handleClick(event)" class='card' id='${id}'><div class='imgBox'>
    <img src='../media/gerndizer[1]-01.png' alt=''>
    </div>
    <div class='contentBox'>
      <h3>${name}</h3>
      <h2 class='price'>${price}.<small>99</small> $</h2>
      <button class='cart'><i class='fa-solid fa-cart-shopping'></i></button>
      <button class='cart'><a href='#' class='view'>View More</a></button>
    </div></div>`
    products_container.appendChild(productDiv)
  })
  
})

date_form.addEventListener('click',async (e)=>{
  console.log(e.target.value)
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?sort=${e.target.value}`)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
  data.data.products.map((product)=>{
    const productDiv = document.createElement('div');
    const {name, price, _id:id} = product
    productDiv.innerHTML = `<div onclick="handleClick(event)" class='card' id='${id}'><div class='imgBox'>
    <img src='../media/gerndizer[1]-01.png' alt=''>
    </div>
    <div class='contentBox'>
      <h3>${name}</h3>
      <h2 class='price'>${price}.<small>99</small> $</h2>
      <button class='cart'><i class='fa-solid fa-cart-shopping'></i></button>
      <button class='cart'><a href='#' class='view'>View More</a></button>
    </div></div>`
    products_container.appendChild(productDiv)
  })
  
})
// mobile forms
price_form_mobile.addEventListener('click',async (e)=>{
  console.log(e.target.value)
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?sort=${e.target.value}`)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
  data.data.products.map((product)=>{
    const productDiv = document.createElement('div');
    const {name, price, _id:id} = product
    productDiv.innerHTML = `<div onclick="handleClick(event)" class='card' id='${id}'><div class='imgBox'>
    <img src='../media/gerndizer[1]-01.png' alt=''>
    </div>
    <div class='contentBox'>
      <h3>${name}</h3>
      <h2 class='price'>${price}.<small>99</small> $</h2>
      <button class='cart'><i class='fa-solid fa-cart-shopping'></i></button>
      <button class='cart'><a href='#' class='view'>View More</a></button>
    </div></div>`
    products_container.appendChild(productDiv)
  })
  
})



company_form_mobile.addEventListener('click',async (e)=>{
  console.log(e.target.value)
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?company=${e.target.value}`)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
  data.data.products.map((product)=>{
    const productDiv = document.createElement('div');
    const {name, price, _id:id} = product
    productDiv.innerHTML = `<div onclick="handleClick(event)" class='card' id='${id}'><div class='imgBox'>
    <img src='../media/gerndizer[1]-01.png' alt=''>
    </div>
    <div class='contentBox'>
      <h3>${name}</h3>
      <h2 class='price'>${price}.<small>99</small> $</h2>
      <button class='cart'><i class='fa-solid fa-cart-shopping'></i></button>
      <button class='cart'><a href='#' class='view'>View More</a></button>
    </div></div>`
    products_container.appendChild(productDiv)
  })
  
})

date_form_mobile.addEventListener('click',async (e)=>{
  console.log(e.target.value)
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?sort=${e.target.value}`)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
  data.data.products.map((product)=>{
    const productDiv = document.createElement('div');
    const {name, price, _id:id} = product
    productDiv.innerHTML = `<div onclick="handleClick(event)" class='card' id='${id}'><div class='imgBox'>
    <img src='../media/gerndizer[1]-01.png' alt=''>
    </div>
    <div class='contentBox'>
      <h3>${name}</h3>
      <h2 class='price'>${price}.<small>99</small> $</h2>
      <button class='cart'><i class='fa-solid fa-cart-shopping'></i></button>
      <button class='cart'><a href='#' class='view'>View More</a></button>
    </div></div>`
    products_container.appendChild(productDiv)
  })
  
})

search_form.addEventListener('submit',async (e)=>{
  e.preventDefault()
  const search_input = document.getElementById('search-input')
  console.log(search_input.value)
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?name=${search_input.value}`)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
  data.data.products.map((product)=>{
    const productDiv = document.createElement('div');
    const {name, price, _id:id} = product
    productDiv.innerHTML = `<div onclick="handleClick(event)" class='card' id='${id}'><div class='imgBox'>
    <img src='../media/gerndizer[1]-01.png' alt=''>
    </div>
    <div class='contentBox'>
      <h3>${name}</h3>
      <h2 class='price'>${price}.<small>99</small> $</h2>
      <button class='cart'><i class='fa-solid fa-cart-shopping'></i></button>
      <button class='cart'><a href='#' class='view'>View More</a></button>
    </div></div>`
    products_container.appendChild(productDiv)
  })

})

search_form_2.addEventListener('submit',async (e)=>{
  e.preventDefault()
  const search_input = document.getElementById('search-input-2')
  console.log(search_input.value)
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?name=${search_input.value}`)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
  data.data.products.map((product)=>{
    const productDiv = document.createElement('div');
    const {name, price, _id:id} = product
    productDiv.innerHTML = `<div onclick="handleClick(event)" class='card' id='${id}'><div class='imgBox'>
    <img src='../media/gerndizer[1]-01.png' alt=''>
    </div>
    <div class='contentBox'>
      <h3>${name}</h3>
      <h2 class='price'>${price}.<small>99</small> $</h2>
      <button class='cart'><i class='fa-solid fa-cart-shopping'></i></button
      <button class='cart'><a href='#' class='view'>View More</a></button>
    </div></div>`
    products_container.appendChild(productDiv)
  })

})


window.onload = async ()=>{
  const data = await axios.get("https://mobilestoreapi-eo3f.onrender.com/api/v1/products")
  data.data.products.map((product)=>{
    const productDiv = document.createElement('div');
    const {name, price, _id:id} = product
    productDiv.innerHTML = `<div onclick="handleClick(event)" class='card' id='${id}'><div class='imgBox'>
    <img src='../media/pokof3.jpg' alt=''>
    </div>
    <div class='contentBox'>
      <h3>${name}</h3>
      <h2 class='price'>${price}.<small>99</small> $</h2>
      <button class='cart'><i class='fa-solid fa-cart-shopping'></i></button>
      <button class='cart'><a href='#' class='view'>View More</a></button>
    </div></div>`
    products_container.appendChild(productDiv)
  })
}

