const product_parent_element = document.getElementById('product')
const commentsContainer = document.getElementById('commentsContainer')
const commentCard = document.getElementById('commentCard')
const review = document.getElementById("write-review")
const post = document.getElementById("Post")

let stars = document.querySelectorAll(".clickable");

let selectedStars = 0

// Sending a request to the server
post.addEventListener('click', async ()=>{
  if(!localStorage.getItem('token')){
    alert('Must be logged in to post comment')
    return;
  }
  var urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get('product_id')
  const used = urlParams.get('used')
  if (selectedStars == 0 ){
    return alert("Please give a rating")
  }
  const product = await axios.
  request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      content: review.value,
      stars: selectedStars
    },
    method: "POST",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/comment/${product_id}?used=${used}`,
    // If Success
  }).then((res)=>{
    location.reload()
    // If Error
  }).catch((res)=>{
    alert(res.response.data.msg)
  })
})

// to Animate the stars
stars.forEach((star, index) => {
  star.addEventListener("mouseenter", function() {
    // to Highlight stars before hovered star
    for (let i = 0; i <= index; i++) {
      if (stars[i].style.filter == `invert(0)`){continue}
      stars[i].style.filter = `invert(.3)`;
    }
    // to Greyout stars after hovered star
    for (let i=index+1;i<stars.length;i++){
      if (stars[i].style.filter == `invert(0)`){break}
      stars[i].style.filter = `invert(.5)`;
    }
  });

  // to Grey out every thing that isn't selected
  star.addEventListener("mouseleave", function(){
    for (let i=0;i<stars.length;i++){
      if (stars[i].style.filter == `invert(0)`){continue}
      stars[i].style.filter = `invert(.5)`;
    }
  })
  star.addEventListener("click", function(){
    selectedStars = index+1
    // to Highlight stars before selected star
    for (let i = 0; i <= index; i++) {
      stars[i].style.filter = `invert(0)`;
    }
    // to Greyout stars after selected star
    for (let i=index+1;i<stars.length;i++){
      stars[i].style.filter = `invert(.5)`;
    }
  })
});

function switchImage(e){
  const active_image = document.getElementById('active-image')
  active_image.src = e.target.src
}

async function addToCart(e){
  var urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get('product_id')
  const used = urlParams.get('used')
  const product = await axios
  .request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "POST",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/wishlist/${product_id}?used=${used}`,
  }).then((res)=>alert('Product added successfully')).catch((res)=>alert(res.response.data.msg))
  
}


// token exists in localStorage.getItem('token')
window.onload = async ()=>{
  var urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get('product_id')
  const used = urlParams.get('used')
  let data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products/${product_id}?used=${used}`)
  data = data.data.product
  const {imges:{img_1, img_2, img_3}} = data
  const {name, company, price, description, soldBy, stars} = data
  const {memory, battery} = data.specifications
  const {dimensions, weight, build, sim} = data.specifications.body
  const {type, size} = data.specifications.display
  const {features, video} = data.specifications.mainCamera
  const {features:features_selfie, video:video_selfie} = data.specifications.selfieCamera
  let comments = data.comments
  if (comments.length > 0){
    comments.forEach(function(item){
      let clone = document.createElement('div');
      clone.classList.add('Card');
      clone.id = 'commentCard';
      clone.innerHTML = `<div>
      <strong> ${item.name} </strong>
      <div id="stars">
        ${`<img src="../media/star.png" width="15px" height="15px" alt="Clickable Image">`.repeat(item.user_stars)
        +`<img src="../media/star.png"  width="15px" height="15px" style="filter: invert(.5)" alt="Clickable Image">`.repeat(5-item.user_stars)
      }
      </div>
    </div>
    <p>${item.content}</p>`;
      commentsContainer.appendChild(clone)
    })
  }
  // info
  const images_div = document.createElement('div')
  images_div.innerHTML = `<img width="400px" src="../media/pokof3.jpg" id="active-image">
  <div onclick="switchImage(event)" class="mt-2" id="images-holder">
    <img width="70px" src="../media/pokof3.jpg">
    <img width="70px" src="../media/download.jpeg">
    <img width="70px" src="../media/download.jpeg">
  </div>`
  product_parent_element.appendChild(images_div)
//   handle image click

  const details_div = document.createElement('div')
  details_div.classList.add('Card')
  details_div.innerHTML = `<h3>${name}</h3>
  <div>
    <h5>$${price}</h5>
  </div>
  <div class="d-flex flex-column">
    <h7>${stars}/5 Stars | ${comments.length} Reviews</h7>
    <h7>Company: ${company}</h7>
    <h7>${used === 'true' ? `Seller: ${soldBy}`:''}</h7>
  </div>
  <!-- Add to cart -->
  <hr/>
  <input class="mb-2" type="button" id="buy-button" value="Buy Now">
  <input class="mb-2" onclick="addToCart(event)" type="button" id="add-to-cart" value="Add To Cart">
  ${(localStorage.getItem('admin') === 'true' && used === 'false') || (used === 'true' && soldBy === `${localStorage.getItem('name')}`)? '<input class="mb-2" onclick="" type="button" id="modify-product" value="Modify Product" />':''}
  ${(localStorage.getItem('admin') === 'true' && used === 'false') || (used === 'true' && soldBy === `${localStorage.getItem('name')}`)? '<input onclick="" type="button" id="delete-product" value="Delete Product" />':''}
  <div class="mt-5 d-flex flex-column">
    <h5>Description: </h5>
    <h6 class="ms-4">${description}</h6>
  </div>
  <div class="mt-4 d-flex flex-column">
    <h5> specs: </h5>
    <div class="ms-4 d-flex flex-column">
        <h6>Dimensions: ${dimensions}</h6>
        <h6>Weight: ${weight}</h6>
        <h6>Build: ${build}</h6>
        <h6>Sim: ${sim}</h6>
        <h6>Display:</h6>
        <h6 class="ms-4">Type: ${type}</h6>
        <h6 class="ms-4">Size: ${size}</h6>
        <h6>Main Camera:</h6>
        <h6 class="ms-4">Features: ${features}</h6>
        <h6 class="ms-4">Video: ${video}</h6>
        <h6>Selfie Camera:</h6>
        <h6 class="ms-4">Features: ${features_selfie}</h6>
        <h6 class="ms-4">Video: ${video_selfie}</h6>
        <h6>Memory: ${memory} Gb</h6>
        <h6>Battery: ${battery} mA</h6>
    </div>
  </div>`
  product_parent_element.appendChild(details_div)
}