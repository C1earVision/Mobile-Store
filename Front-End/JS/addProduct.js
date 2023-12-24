const form = document.getElementById('add-form')

form.addEventListener('submit', async function(e){
  e.preventDefault();
  let formData = new FormData(form);
  formData = [...formData]
  formData[4][1] = await convertFile(formData[4][1])
  formData[5][1] = await convertFile(formData[5][1])
  formData[6][1] = await convertFile(formData[6][1])
  data = {imges:{img_1:formData[4][1], img_2:formData[5][1], img_3:formData[6][1]}, name:formData[0][1], price:Number(formData[1][1]), company:formData[2][1], description:formData[3][1], specifications:{body:{dimensions:formData[7][1], weight:Number(formData[8][1]), build:formData[9][1], sim:formData[10][1]}, display:{type:formData[11][1], size:formData[12][1]}, battery:Number(formData[13][1]), memory:Number(formData[14][1]), mainCamera:{features:formData[15][1], video:formData[16][1]}, selfieCamera:{features:formData[17][1], video:formData[18][1]}}}
  console.log(data)
  var urlParams = new URLSearchParams(window.location.search);
  const used = Boolean(urlParams.get('used'))
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
    alert('error')
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