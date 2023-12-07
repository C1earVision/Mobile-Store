const div = document.getElementById('div')


window.onload = async ()=>{
  var urlParams = new URLSearchParams(window.location.search);
  product_id = urlParams.get('product_id')
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products/${product_id}`)
  div.innerHTML = data.data.product.name
}