const express = require("express")
const router = express.Router()
const stripe  = require("./../stripe/stripe")
const User = require("../models/userModel")

router.get("/price", async (req, res) => {
  // const { username , password } = req.body

  const donation1 = await stripe.prices.retrieve(process.env.STRIPE_PRICE_1);
  const donation2 = await stripe.prices.retrieve(process.env.STRIPE_PRICE_2);
  const donation3 = await stripe.prices.retrieve(process.env.STRIPE_PRICE_3);
  
  let donations = [];

  donations.push({
    key: 1,
    priceId: donation1.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(donation1.unit_amount / 100),
  })

  donations.push({
    key: 2,
    priceId: donation2.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(donation2.unit_amount / 100),
  })
  
  donations.push({
    key: 3,
    priceId: donation3.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(donation3.unit_amount / 100),
  })

  res.send(donations)
});

router.post("/payment", async (req, res) => {
  if (req.method === 'POST') {
      let user = await User.findOne({ email: req.body.email });
        
      let custumerId = user?.stripe_custumer_id;

      if (!custumerId) {
        const stripeCustomer = await stripe.customers.create({
          email: req.body.email,
        })

        user.stripe_custumer_id = stripeCustomer.id;

        await user.save();

        custumerId = stripeCustomer.id;
      }

      let paymentMethod;
      console.log(req.body.typePayment);
      switch (req.body.typePayment) {
        case 1:
          paymentMethod = 'card'
        break;
        case 3:
          paymentMethod = 'boleto'
        break;              
        default:
          throw new Error('Available Method')
      }

      try {
        const stripeCheckoutSession = await stripe.checkout.sessions.create({
          customer: custumerId,
          payment_method_types: [paymentMethod],
          billing_address_collection: 'auto',
          line_items: [
            { price: req.body.priceId, quantity: 1}
          ],
          mode: 'payment',
          success_url: process.env.STRIPE_SUCCESS_URL,
          cancel_url: process.env.STRIPE_CANCEL_URL
        })
  
        res.status(200).json({ sessionId: stripeCheckoutSession.id})
      } catch (err) {
        console.log(err);
      }
  

      // console.log(stripeCheckoutSession.id)
    } else {
      res.setHeader('Allow', 'POST')
      res.status(405).end('Methos not allowed');
    }
});

module.exports = router