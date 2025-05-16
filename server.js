const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51RP3MuBDGmywb1ECgR92aHie9KAk3sTkHsvpMZM5MKCvcDPUNUPpQM527HZhc1wyzuOB1UMzdlwFoJl0LzTmhXuB006upc57cH');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));
