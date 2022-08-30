require('dotenv').config();
require('./strategies/discordstrategy');
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
const editorRoute = require('./routes/editor')

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
//app.set('view engine', 'php');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/:GuildID/editor', editorRoute);

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

app.listen(PORT, () => console.log(`Now listening to requests on port ${PORT}`));

// https://discordapp.com/developers/docs/topics/permissions