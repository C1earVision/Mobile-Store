var urlParams = new URLSearchParams(window.location.search);
product_id = urlParams.get('product_id')

paypal.Buttons({
  createOrder() {
    return fetch("https://mobilestoreapi-eo3f.onrender.com/api/v1/user/createCheckOutSession", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    .then((order) => order.data.id);
  },

  onApprove: function (data, actions) {
    // This function captures the funds from the transaction.
    return actions.order.create().then(function (details) {
        // This function shows a transaction success message to your buyer.
        alert('Transaction completed by ' + details.payer.name.given_name);
    });
  }
}).render('#paypal');
    