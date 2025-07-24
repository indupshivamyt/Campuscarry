const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  const rupeeAmount = Math.ceil(amount * 1.05); // Add 5% + round up

  const options = {
    amount: rupeeAmount * 100, // in paise
    currency: "INR",
    receipt: "rcpt_" + Math.random().toString(36).slice(2),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send("Server Error");
  }
});

app.get("/", (req, res) => res.send("CampusCarry Razorpay Backend"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
