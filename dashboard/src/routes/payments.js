const stripe = require("stripe")(process.env.STRIPE_SECRET);
const router = require('express').Router();

router.use("/checkout", async (req, res) => {
    res.render('payment');
})

router.use("/complete", async (req, res) => {
    res.render('payment_complete');
})

module.exports = router;