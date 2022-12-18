import React, { useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import axios from "axios";
import { base_url } from "../../Api/services";

function Razorpay() {
  //Function to load razorpay script for the display of razorpay payment SDK.
  function loadRazorpayScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  //function will get called when clicked on the pay button.
  async function displayRazorpayPaymentSdk() {
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. please check are you online?");
      return;
    }

    // creating a new order and sending order ID to backend
    const result = await axios.post(`${base_url}payment/razorpay_order`, {
      order_id: "order_KNzvO2qHOGX0QW",
      amount : 10,
      name : 'bala'
    });

    if (!result) {
      alert("Server error. please check are you onlin?");
      return;
    }

    // Getting the order details back
    const {
      merchantId = null,
      amount = null,
      currency = null,
      orderId = null,
    } = result.data;
    console.log(result.data);
    console.log(typeof result.data.amount);

    const options = {
      key: merchantId,
      amount: "500",
      currency: "INR",
      name: "Razorpay Testing",
      description: "Test Transaction",
      //   image: { logo },
      order_id: orderId,
      callback_url: `${base_url}payment/razorpay_callback`,
      redirect: false,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "bala",
        email: "bala@example.com",
        contact: "8140067473",
      },
      notes: {
        address: "None",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    paymentObject.open();
  }

  const HandleFetch = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    HandleFetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" alt="logo" />
        <p>Razorpay Payments ! Try it Once </p>
        <button className="App-link" onClick={displayRazorpayPaymentSdk}>
          Pay Now To Test
        </button>
      </header>
    </div>
  );
}

export default Razorpay;
