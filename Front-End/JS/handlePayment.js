var urlParams = new URLSearchParams(window.location.search);
product_id = urlParams.get('product_id')

paypal.Buttons({
  createOrder : async function () {
    return await axios
    .request({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      url: `https://mobilestoreapi-eo3f.onrender.com/api/v1/user/createCheckOutSession`,
      data: { 
        items: [{
          id: product_id,
          quantity: 1
        }]
      },
    })
    .then((response) => response.json())
    .then((order) => {return order.id})
    .catch((err)=>console.log(err.error))
  },

  onApprove: function (data, actions) {
    // This function captures the funds from the transaction.
    return actions.order.capture().then(function (details) {
      alert('Transaction completed by ' + details.payer.name.given_name);
    });
  }
}).render('#paypal');
    