const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const Donation = require("../models/donationModel")
const bodyParser = require('body-parser')

const relevantEvents = new Set([
  'checkout.session.completed',
 'customer.deleted'
])

router.post('/webhooks', bodyParser.raw({ type: '*/*'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  let user;

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
            user = await User.findOne({ stripe_custumer_id: event.data.object.customer });

            console.log('Evento recebido', event);

            const data = {
              "idUsuario": user._id,
              "value": event.data.object.amount_total / 100,
              "anonymous": false,
              "type_payment": event.data.object.payment_method_types[0] === 'card' ? 1 : event.data.object.payment_method_types[0] === 'boleto' ? 3 : 0,
              "reverse": false,
              "status": event.data.object.payment_status === 'paid' ? 1 : event.data.object.payment_status === 'unpaid' ? 2 : 0
            }

            const newDonation = new Donation(data);    
            await newDonation.save();

            break;
          case 'customer.deleted':
            console.log('Evento recebido', event);

            user = await User.findOne({ stripe_custumer_id: event.data.object.id });

            user.stripe_custumer_id = '';
            await user.save();
            break;
          default:
            console.log('Unhandled Event.')
        }

      } catch (err) {
        return res.json({ error: 'Webhook handler failed' })
      }


    }
  
    res.json({ received: true})
});

module.exports = router