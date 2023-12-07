function handleClick(e){
  let parentElement = e.target.parentNode;
  while (parentElement && !parentElement.id) {
    parentElement = parentElement.parentNode;
  }
  const product_id = parentElement.id
  console.log(product_id)
  document.location.href = `/Front-End/HTML/productPage.html?product_id=${product_id}`
}





