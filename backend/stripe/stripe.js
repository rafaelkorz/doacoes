const Stripe = require("stripe")
const { version } = require("../package.json")

module.exports = stripe = new Stripe(
  process.env.STRIPE_API_KEY,
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'donations',
      version
    }
  }
)