
async function handleClick(e, used){
  let parentElement = e.target.parentNode;
  if(e.target.id === 'cart' || e.target.classList[0] === 'cart'){
    while (parentElement && (!parentElement.id || parentElement.id === 'cart' || parentElement.classList[0] === 'cart')) {
      parentElement = parentElement.parentNode;
    }
    const product_id = parentElement.id
    var urlParams = new URLSearchParams(window.location.search);
    const used = Boolean(urlParams.get('used'))
    // add product to cart
    const product = await axios
    .request({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/wishlist/${product_id}?used=${used}`,
    }).then((res)=>alert("Product Added Successfully")).catch((res)=>alert(res.response.data.msg))
    return
  }
  while (parentElement && !parentElement.id) {
    parentElement = parentElement.parentNode;
  }
  const product_id = parentElement.id
  document.location.href = `./productPage.html?product_id=${product_id}&used=${used}`
}





