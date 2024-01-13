const form = document.getElementById('add-form')
const insert_before = document.getElementById('insert-before')
const form_div = document.getElementById('form_div')
const file_input_1 = document.getElementById('file-input-1')
const file_input_2 = document.getElementById('file-input-2')
const file_input_3 = document.getElementById('file-input-3')
const drop_area = document.getElementById('drop-area')


file_input_1.addEventListener('change', ()=>{
  drop_area.classList.add('uploaded');
})
file_input_2.addEventListener('change', ()=>{
  drop_area.classList.add('uploaded');
})
file_input_3.addEventListener('change', ()=>{
  drop_area.classList.add('uploaded');
})


window.onload = ()=>{
  var urlParams = new URLSearchParams(window.location.search);
  const used = Boolean(urlParams.get('used'))
  if(localStorage.getItem('admin') === false && !used){
    window.location = '/Front-End/index.html'
  }else{
    let status = document.getElementById('status')
    if(used === true){
      status.innerHTML = 'USED'
      phoneNumberDiv = document.createElement('div')
      phoneNumberDiv.id = 'PhoneNumberDiv'
      phoneNumberDiv.innerHTML = `<label for="phoneNumber">Phone Number</label>
      <input type="number" placeholder="Enter your phone number" name="phoneNumber" id="phoneNumber_input">`
      form_div.insertBefore(phoneNumberDiv, insert_before)
    }else{
      status.innerHTML = 'NEW'
    }
  }
  
}

form.addEventListener('submit', async function(e){
  e.preventDefault();
  var urlParams = new URLSearchParams(window.location.search);
  const used = Boolean(urlParams.get('used'))
  let formData = new FormData(form);
  formData = [...formData]
  if(used){
    formData[5][1] = await convertFile(formData[5][1])
    formData[6][1] = await convertFile(formData[6][1])
    formData[7][1] = await convertFile(formData[7][1])
    data = {phoneNumber: formData[0][1], imges:{img_1:formData[5][1], img_2:formData[6][1], img_3:formData[7][1]}, name:formData[1][1], price:Number(formData[2][1]), company:formData[3][1], description:formData[4][1], specifications:{body:{dimensions:formData[8][1], weight:Number(formData[9][1]), build:formData[10][1], sim:formData[11][1]}, display:{type:formData[12][1], size:formData[13][1]}, battery:Number(formData[14][1]), memory:Number(formData[15][1]), mainCamera:{features:formData[16][1], video:formData[17][1]}, selfieCamera:{features:formData[18][1], video:formData[19][1]}}}
  }else{
    console.log('im here')
    formData[4][1] = await convertFile(formData[4][1])
    formData[5][1] = await convertFile(formData[5][1])
    formData[6][1] = await convertFile(formData[6][1])
    data = {imges:{img_1:formData[4][1], img_2:formData[5][1], img_3:formData[6][1]}, name:formData[0][1], price:Number(formData[1][1]), company:formData[2][1], description:formData[3][1], specifications:{body:{dimensions:formData[7][1], weight:Number(formData[8][1]), build:formData[9][1], sim:formData[10][1]}, display:{type:formData[11][1], size:formData[12][1]}, battery:Number(formData[13][1]), memory:Number(formData[14][1]), mainCamera:{features:formData[15][1], video:formData[16][1]}, selfieCamera:{features:formData[17][1], video:formData[18][1]}}}
  }
  const product = await axios.
  request({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: data,
    method: "POST",
    url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/admin?used=${used}`,
  }).then((res)=>{
    alert('Product added successfully')
  }).catch((res)=>{
    console.log(res)
  })
}) 


const convertFile = async (file) => {
  console.log(file)
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