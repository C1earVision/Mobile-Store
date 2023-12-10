const products_container = document.getElementById('card-container')

const form = document.getElementById('filter-form')
const form_mobile = document.getElementById('filter-form-mobile')

const search_form = document.getElementById('search-form')
const search_form_2 = document.getElementById('search-form-2')

const pages_div = document.getElementById('pages')
let num_of_pages = 1


pages_div.addEventListener('click',async (e)=>{
  const page_num =  e.target.innerHTML
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?page=${page_num}`)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
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
  
})

form.addEventListener('click',async (e)=>{
  const classes = e.target.classList[0]
  let filter_type = null
  if (classes === 'company'){
    filter_type = 'company'
  }else if (classes === 'date' || classes === 'price'){
    filter_type = 'sort'
  }
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?${filter_type}=${e.target.value}`)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
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
  
})

// mobile forms
form_mobile.addEventListener('click',async (e)=>{
  const classes = e.target.classList[0]
  let filter_type = null
  if (classes === 'company'){
    filter_type = 'company'
  }else if (classes === 'date' || classes === 'price'){
    filter_type = 'sort'
  }
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?${filter_type}=${e.target.value}`)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
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
    <img src='../media/pokof3.jpg' alt=''>
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
  num_of_pages = Math.ceil(data.data.countAll / 12)
  while (products_container.firstChild) {
    products_container.removeChild(products_container.firstChild);
  }
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

  for(let i=1; i<=num_of_pages; i++){
    const btn_div = document.createElement('div')
    btn_div.classList.add("button")
    btn_div.innerHTML = `<button>${i}</button>`
    pages_div.appendChild(btn_div)
  }
}

