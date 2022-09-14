require('dotenv').config();
require('./strategies/discordstrategy');
const stripe = require("stripe")(process.env.STRIPE_SECRET);
//const stripe = require("stripe")('sk_test_Ou1w6LVt3zmVipDVJsvMeQsc');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 53134;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const db = require('./database/mongodb');
const path = require('path');
const mongoose = require('mongoose');

db.then(() => console.log('Connected to MongoDB.')).catch(err => console.log(err));
// Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const guildRoute = require('./routes/guild')
const checkout = require('./routes/payments')

app.use(express.static(__dirname + '/public/scripts'));

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    resave: false,
    name: 'discord.oauth2',
    store: new MongoStore({ mongooseConnection:  mongoose.connection })
}));



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// Middleware Routes
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/:GuildID', guildRoute);
app.use('/', checkout);

app.get('/', isAuthorized, (req, res) => {
    res.render('home');
});

function isAuthorized(req, res, next) {
    if(req.user) {
        console.log("User is logged in.");
        res.redirect('/dashboard');
    }
    else {
        console.log("User is not logged in.");
        next();
    }
}

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
  
  app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "sgd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
  

app.listen(PORT, () => console.log(`Now listening to requests on port ${PORT}`));