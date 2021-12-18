const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const Donation = require("../models/donationModel")
const bodyParser = require('body-parser')

const relevantEvents = new Set([
  'checkout.session.completed'
])

router.post('/webhooks', bodyParser.raw({ type: '*/*'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).send(`Webhooks error: '${err.message}`);
    }
  
    const { type } = event;
  
    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'checkout.session.completed':
            let user = await User.findOne({ stripe_custumer_id: event.data.object.customer });

            const data = {
              "idUsuario": user._id,
              "value": event.data.object.amount_total / 100,
              "anonymous": false,
              "type_payment": 1,
              "reverse": false,
              "status": event.data.object.payment_status === 'paid' ? 1 : 0
            }

            const newDonation = new Donation(data);    
            await newDonation.save();

            break;
          default:
            throw new Error('Unhandled Event.')
        }
      } catch (err) {
        return res.json({ error: 'Webhook handler failed' })
      }

      // console.log('Evento recebido', event);
    }
  
    res.json({ received: true})
});

module.exports = router