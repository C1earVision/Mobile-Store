ScrollReveal({
    reset: true,
    distance: '150px',
    duration: 1500,
    delay: 20,
});

ScrollReveal().reveal('.home-content h1 ,.home-content h3 ,.new-content h1 ,.used-content h1', { origin: 'top' });
ScrollReveal().reveal('.home-content p ,.home-content h2 ', { origin: 'bottom' });
ScrollReveal().reveal('.Lefth  ', { origin: 'left' });
ScrollReveal().reveal(' .Righh ', { origin: 'right' });

const typed = new Typed('.multi-text', {
  strings: ['Unleash Innovation, Embrace Quality.'],
  typeSpeed: 150,
  backDelay: 2000,
  backSpeed: 10,
  loop:true
});


// done by elmohamady

function createSlick(){  
  $(".slider").not('.slick-initialized').slick({
    centerMode: true,
      autoplay: true,
      dots: true, 
        arrows: true,
      slidesToShow: 3,
      responsive: [{ 
          breakpoint: 768,
          settings: {
              dots: false,
              arrows: false,
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1
          } 
      }]
  }); 

}
$(window).on( 'resize', createSlick );



async function addToCart(e, used){
  const product_id = e.target.id
  const product = await axios
  .request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "POST",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/wishlist/${product_id}?used=${used}`,
  }).then((res)=>alert('Product added successfully')).catch((res)=>alert(res.response.data.msg))
  
}



window.onload = async ()=>{
  const new_phones_slider = document.getElementById('new-content')
  const used_phones_slider = document.getElementById('used-content')
  const data_new = await axios.get("https://mobilestoreapi-eo3f.onrender.com/api/v1/products?sort=-createdAt&limit=6")
  const data_used = await axios.get("https://mobilestoreapi-eo3f.onrender.com/api/v1/products?sort=-createdAt&limit=6&used=true")

  data_new.data.products.map((product)=>{
    const new_slider_div = document.createElement('div')
    new_slider_div.innerHTML = 
    `<img width='340px' src='${product.imges.img_1}'>
    <div class="desc">
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <a onclick="addToCart(event, false)" href="#" class="btn" id="${product._id}">Add to Cart</a>
    </div>`
    new_phones_slider.appendChild(new_slider_div)
  })
  // used
  data_used.data.products.map((product)=>{
    const used_slider_div = document.createElement('div')
    used_slider_div.innerHTML = 
    `<img width='340px' src='${product.imges.img_1}'>
    <div class="desc">
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <a onclick="addToCart(event, true)" href="#" class="btn" id="${product._id}">Add to Cart</a>
    </div>`
    used_phones_slider.appendChild(used_slider_div)
  })
  createSlick();
  
}





