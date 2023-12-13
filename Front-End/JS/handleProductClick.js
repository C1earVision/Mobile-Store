
function handleClick(e, used){
  let parentElement = e.target.parentNode;
  if(e.target.id === 'cart'){
    while (parentElement && (!parentElement.id || parentElement.id === 'cart') ) {
      parentElement = parentElement.parentNode;
    }
    const product_id = parentElement.id
    // add product to cart
    console.log(product_id)
    return
  }
  while (parentElement && !parentElement.id) {
    parentElement = parentElement.parentNode;
  }
  const product_id = parentElement.id
  document.location.href = `/Front-End/HTML/productPage.html?product_id=${product_id}&used=${used}`
}





