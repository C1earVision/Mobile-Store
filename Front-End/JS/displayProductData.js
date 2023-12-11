const info = document.getElementById('info')
const payment = document.getElementById('payment')
const description_parent_element = document.getElementById('description')

const images_holder = document.getElementById('images-holder') 
const active_image = document.getElementById('active-image')
images_holder.addEventListener('click',(e)=>{
    active_image.src = e.target.src
})



window.onload = async ()=>{
  var urlParams = new URLSearchParams(window.location.search);
  product_id = urlParams.get('product_id')
  let data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products/${product_id}`)
  data = data.data.product
  const {name, company, price, description} = data
  const {memory, battery} = data.specifications
  const {dimensions, weight, build, sim} = data.specifications.body
  const {type, size} = data.specifications.display
  const {features, video} = data.specifications.mainCamera
  const {features:features_selfie, video:video_selfie} = data.specifications.selfieCamera
  // info
  const info_div = document.createElement('div')
  info_div.innerHTML = `<h1>${name}</h1>
  <span>$${price}</span>
  <span class="c mb-3">Company: ${company}</span>`
  info.insertBefore(info_div ,payment)
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dimensions: ${dimensions}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Weight: ${weight} g<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Build: ${build}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sim: ${sim}
        </li>

        <li class="body"><span>&nbsp;&nbsp;&nbsp;&nbsp;Display specifications:</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: ${type}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Size: ${size}
        </li>

        <li class="body"><span>&nbsp;&nbsp;&nbsp;&nbsp;Memory specifications:</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${memory} GB<br>
        </li>

        <li class="body"><span>&nbsp;&nbsp;&nbsp;&nbsp;Main camera:</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Photo: ${features}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Video: ${video}
        </li>

        <li class="body" id="selfie-camera-specs"><span>&nbsp;&nbsp;&nbsp;&nbsp;Selfie camera:</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Photo: ${features_selfie}<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Video: ${video_selfie}
        </li>

        <li class="body" id="battery-specs"><span>&nbsp;&nbsp;&nbsp;&nbsp;Battery specifications:</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${battery} Mah<br>
        </li>
  </div>
  </ul>`
  description_parent_element.appendChild(description_div)

}