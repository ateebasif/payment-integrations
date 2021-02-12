const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.port || 4000;

const sk =
  "sk_test_51IK1MZI62CmuoLGMICxNsWtpn1sem9R5GAcOHbcoaEYgVkdVGDm02CfhrKsb7kbAuPZ8r9GM8UpaZAzB6ePb4Z7m00Yol3F2SH";

// const stripe = require("stripe")(process.env.REACT_APP_SECRET_KEY);
const stripe = require("stripe")(sk);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/getIntent", async (req, res) => {
  console.log("hit");

  if (req.method === "POST") {
    console.log("hit");

    try {
      const { amount } = req.body;

      //   console.log("req body", req);
      console.log("req body AMOUNT", amount);

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });

      console.log("client_secret", paymentIntent.client_secret);

      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
});

app.listen(port, () => console.log("listening "));
