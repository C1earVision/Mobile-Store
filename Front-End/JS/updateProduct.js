const form = document.getElementById('add-form')
const insert_before = document.getElementById('insert-before')
const form_div = document.getElementById('form_div')
let imges = {}
async function updateProduct(){
  const name_input = document.getElementById('name_input')
  const price_input = document.getElementById('price_input')
  const company_input = document.getElementById('company_input')
  const description_input = document.getElementById('description_input')  
  const dimensions_input = document.getElementById('dimensions_input')
  const weight_input = document.getElementById('weight_input')
  const build_input = document.getElementById('build_input')
  const sim_input = document.getElementById('sim_input')
  const d_type_input = document.getElementById('d-type_input')
  const d_size_input = document.getElementById('d-size_input')
  const battery_input = document.getElementById('battery_input')
  const memory_input = document.getElementById('memory_input')
  const cam_features_input = document.getElementById('cam_features_input')  
  const v_quality_input = document.getElementById('v_quality_input')  
  const cam_features_selfie_input = document.getElementById('cam_features_selfie_input')  
  const v_quality_selfie_input = document.getElementById('v_quality_selfie_input')  

  var urlParams = new URLSearchParams(window.location.search);
  const used = urlParams.get('used')
  const product_id = urlParams.get('product_id')
  let product = await axios.
  request({
    method: "GET",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/products/${product_id}?used=${used}`,
  }).catch((res)=>{
    console.log(res)
  })
  product = product.data.product
  name_input.value = `${product.name}`
  price_input.value = `${product.price}`
  company_input.value = `${product.company}`
  description_input.value = `${product.description}`
  dimensions_input.value = `${product.specifications.body.dimensions}`
  weight_input.value = `${product.specifications.body.weight}`
  build_input.value = `${product.specifications.body.build}`
  sim_input.value = `${product.specifications.body.sim}`
  d_type_input.value = `${product.specifications.display.type}`
  d_size_input.value = `${product.specifications.display.size}`
  battery_input.value = `${product.specifications.battery}`
  memory_input.value = `${product.specifications.memory}`
  cam_features_input.value = `${product.specifications.mainCamera.features}`
  v_quality_input.value = `${product.specifications.mainCamera.video}`
  cam_features_selfie_input.value = `${product.specifications.selfieCamera.features}`
  v_quality_selfie_input.value = `${product.specifications.selfieCamera.video}`
  imges = {imges:{img_1: product.imges.img_1, img_2: product.imges.img_2, img_3: product.imges.img_3}}
}

updateProduct()


form.addEventListener('submit', async function(e){
  e.preventDefault();
  var urlParams = new URLSearchParams(window.location.search);
  const used = urlParams.get('used')
  const product_id = urlParams.get('product_id')
  let data = {...imges}
  let formData = new FormData(form);
  formData = [...formData]
  if (formData[4][1].size > 0){
    formData[4][1] = await convertFile(formData[4][1])
    data.imges = {...data.imges, img_1:formData[4][1]}
  }
  if (formData[5][1].size > 0){
    formData[5][1] = await convertFile(formData[5][1])
    data.imges = {...data.imges, img_2:formData[5][1]}
  }
  if(formData[6][1].size > 0){
    formData[6][1] = await convertFile(formData[6][1])
    data.imges = {...data.imges, img_3:formData[6][1]}
  }
  data = {...data, name:formData[0][1], price:Number(formData[1][1]), company:formData[2][1], description:formData[3][1], specifications:{body:{dimensions:formData[7][1], weight:Number(formData[8][1]), build:formData[9][1], sim:formData[10][1]}, display:{type:formData[11][1], size:formData[12][1]}, battery:Number(formData[13][1]), memory:Number(formData[14][1]), mainCamera:{features:formData[15][1], video:formData[16][1]}, selfieCamera:{features:formData[17][1], video:formData[18][1]}}}
  const product = await axios.
  request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: data,
    method: "PATCH",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/admin/${product_id}?used=${used}`,
  }).then((res)=>{
    alert('Product updated successfully')
  }).catch((res)=>{
    console.log(res)
  })
}) 


const convertFile = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  }).then((res) => fileData = res);
};