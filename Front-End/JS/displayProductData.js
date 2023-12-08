const info = document.getElementById('info')
const description_parent_element = document.getElementById('description')


window.onload = async ()=>{
  var urlParams = new URLSearchParams(window.location.search);
  product_id = urlParams.get('product_id')
  let data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products/${product_id}`)
  data = data.data.product
  // specifications:{body:{dimensions, weight, build, sim}}
  // ,display:{type, size},memory,mainCamera:{features, video},
  // selfieCamera:{features_selfie, video_selfie},battery
  const {name, company, price, description, memory} = data
  const {battery} = data.specifications
  const {dimensions, weight, build, sim} = data.specifications.body
  const {type, size} = data.specifications.display
  const {features, video} = data.specifications.mainCamera
  const {features:features_selfie, video:video_selfie} = data.specifications.selfieCamera
  // info
  const info_div = document.createElement('div')
  info_div.innerHTML = `<h1>${name}</h1>
  <span>$${price}</span>
  <span class="c">${company}</span>
  <div class="options">
      <a href="#">Buy It Now</a>
      <a href="#">Add to Cart</a>
  </div>`
  info.appendChild(info_div)
  // description
  const description_div = document.createElement('div')
  description_div.innerHTML = 
    `<ul class="features">
    <li class="body"><span>Description</span><br>
        &nbsp;&nbsp;&nbsp;&nbsp;${description}
    </li>
  </ul>
  <div class="spec">
    <ul class="features">
        <p>Specifications:</p>

        <li class="body"><span>&nbsp;&nbsp;&nbsp;&nbsp;Body specifications:</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dimensions}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${weight}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${build}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${sim}
        </li>

        <li class="body"><span>&nbsp;&nbsp;&nbsp;&nbsp;Display specifications:</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${type}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${size}
        </li>

        <li class="body"><span>&nbsp;&nbsp;&nbsp;&nbsp;Memory specifications:</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${memory}<br>
        </li>

        <li class="body"><span>&nbsp;&nbsp;&nbsp;&nbsp;Main camera:</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${features}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${video}
        </li>

        <li class="body" id="selfie-camera-specs"><span>&nbsp;&nbsp;&nbsp;&nbsp;Selfie camera:</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${features_selfie}<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${video_selfie}
        </li>

        <li class="body" id="battery-specs"><span>&nbsp;&nbsp;&nbsp;&nbsp;Battery specifications:</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${battery}<br>
        </li>
  </div>
  </ul>`
  description_parent_element.appendChild(description_div)

}