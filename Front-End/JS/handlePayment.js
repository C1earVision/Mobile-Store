const buy_button = document.getElementById('buy-button')
var urlParams = new URLSearchParams(window.location.search);
product_id = urlParams.get('product_id')

buy_button?.addEventListener('click', (e)=>{
  axios.post('https://mobilestoreapi-eo3f.onrender.com/api/v1/user/createCheckOutSession',
  {
    items: [
      {id: product_id, quantity: 1}
    ]
  }).then((res)=>console.log(res))
})