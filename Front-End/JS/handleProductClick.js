
function handleClick(e, used){
  let parentElement = e.target.parentNode;
  while (parentElement && !parentElement.id) {
    parentElement = parentElement.parentNode;
  }
  console.log(used)
  const product_id = parentElement.id
  document.location.href = `/Front-End/HTML/productPage.html?product_id=${product_id}&used=${used}`
}





