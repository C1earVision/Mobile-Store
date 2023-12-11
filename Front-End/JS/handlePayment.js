var urlParams = new URLSearchParams(window.location.search);
product_id = urlParams.get('product_id')

paypal.Buttons({
  // Order is created on the server and the order id is returned
  createOrder: (data, actions) => {
  return fetch("https://mobilestoreapi-eo3f.onrender.com/api/v1/user/orders/order", {
      method: "post",
      body:{
        cart:{
          id: product_id,
          quantity: 1
        }
      }
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
  })
  .then((response) => response.json())
  .then((order) => order.id);
  },
  // Finalize the transaction on the server after payer approval
  onApprove: (data, actions) => {
  return fetch(`https://mobilestoreapi-eo3f.onrender.com/api/v1/user/orders/${data.orderID}/capture`, {
      method: "post",
  })
  .then((response) => response.json())
  .then((orderData) => {
      // Successful capture! For dev/demo purposes:
      console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
      const transaction = orderData.purchase_units[0].payments.captures[0];
      alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
      // When ready to go live, remove the alert and show a success message within this page. For example:
      // const element = document.getElementById('paypal-button-container');
      // element.innerHTML = '<h3>Thank you for your payment!</h3>';
      // Or go to another URL:  actions.redirect('thank_you.html');
  });
  }
}).render('#paypal');
    