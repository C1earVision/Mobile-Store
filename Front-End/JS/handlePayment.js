var urlParams = new URLSearchParams(window.location.search);
product_id = urlParams.get('product_id')

paypal.Buttons({
  createOrder() {
    return fetch("https://mobilestoreapi-eo3f.onrender.com/api/v1/user/createCheckOutSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: [
          {
            id: product_id,
            sku: "5",
            quantity: "1",
          },
        ]
      })
    })
    .then((response) => response.json())
    .then((order) => order.id);
  }
}).render('#paypal');
    