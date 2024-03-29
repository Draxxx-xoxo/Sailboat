const stripe = require("stripe")(process.env.STRIPE_SECRET);
const express = require('express');
const path = require('path');
const axios = require('axios');
const router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

function isAuthorized(req, res, next) {
    if(req.user) {
        console.log("User is logged in.");
        //console.log(req.user);
        //console.log(req.user.discordId)
        next();
    }
    else {
        console.log("User is not logged in.");
        res.redirect('/auth');
    }
}

router.use("/checkout", isAuthorized, async (req, res) => {

  /*const results = await axios({
    method: 'get',
    url: 'https://api.stripe.com/v1/customers',
    params:{
      email: req.user.email
    },
    headers:{
      Authorization: `Bearer ${process.env.STRIPE_SECRET}`
    }
  });*/
  
  res.render('checkout')

  /*if(results.data.data){
    res.redirect('/billing')
  } else {
    res.render('checkout',{
      email: req.user.email
    });
  }*/
})

router.use("/pricing", isAuthorized, async (req, res) => {

    res.render('pricing_table',{
      email: req.user.email
    });
})


router.use("/success", isAuthorized, async (req, res) => {
  res.render('checkout-success');
})

router.use("/billing", isAuthorized, async (req, res) => {
  res.render('manage_billing');
})

router.post('/create-checkout-session', async (req, res) => {
    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ['data.product'],
    });
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          // For metered billing, do not pass quantity
          quantity: 1,
  
        },
      ],
      mode: 'subscription',
      success_url: `http://localhost:53134/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:53134/checkout`,
      customer_email: req.user.email,
      custom_fields: [
        {
          key: 'discordUserName',
          label: {
            type: 'custom',
            custom: 'Discord User Name',
          },
          type: 'text',
        },
        {
          key: 'discordServerName',
          label: {
            type: 'custom',
            custom: 'Discord Server Name',
          },
          type: 'text',
        },
      ],
    });
    res.redirect(303, session.url);
  });
router.post('/create-portal-session', async (req, res) => {
    // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    // Typically this is stored alongside the authenticated user in your database.
    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  
    // This is the url to which the customer will be redirected when they are done
    // managing their billing with the portal.
    const returnUrl = "http://localhost:53134/";
  
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });
  
    res.redirect(303, portalSession.url);
  });

router.post('/create-customer-portal-session', async (req, res) => {
   const results = await axios({
    method: 'get',
    url: 'https://api.stripe.com/v1/customers',
    params:{
      email: req.user.email
    },
    headers:{
      Authorization: `Bearer ${process.env.STRIPE_SECRET}`
    }
  });
    // Authenticate your user.
    const session = await stripe.billingPortal.sessions.create({
      customer: results.data.data[0].id,
      return_url: 'http://localhost:53134/dashboard',
    });
  
    res.redirect(session.url);
  });

router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    (request, response) => {
      let event = request.body;
      // Replace this endpoint secret with your endpoint's unique secret
      // If you are testing with the CLI, find the secret by running 'stripe listen'
      // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
      // at https://dashboard.stripe.com/webhooks
      const endpointSecret = 'whsec_12345';
      // Only verify the event if you have an endpoint secret defined.
      // Otherwise use the basic event deserialized with JSON.parse
      if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature'];
        try {
          event = stripe.webhooks.constructEvent(
            request.body,
            signature,
            endpointSecret
          );
        } catch (err) {
          console.log(`⚠️  Webhook signature verification failed.`, err.message);
          return response.sendStatus(400);
        }
      }
      let subscription;
      let status;
      // Handle the event
      switch (event.type) {
        case 'customer.subscription.trial_will_end':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription trial ending.
          // handleSubscriptionTrialEnding(subscription);
          break;
        case 'customer.subscription.deleted':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription deleted.
          // handleSubscriptionDeleted(subscriptionDeleted);
          break;
        case 'customer.subscription.created':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription created.
          // handleSubscriptionCreated(subscription);
          break;
        case 'customer.subscription.updated':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription update.
          // handleSubscriptionUpdated(subscription);
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }
      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
  );
module.exports = router;