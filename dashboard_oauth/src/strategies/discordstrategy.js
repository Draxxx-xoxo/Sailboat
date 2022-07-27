require('dotenv').config()
const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../models/DiscordUser');
const {pg} = require('../database/pg')

passport.serializeUser((user, done) => {
    console.log("Serialize");
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    console.log("Deserializing");
    const user = await DiscordUser.findById(id);
    //console.log(user)
    if(user) 
        done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await DiscordUser.findOne({ discordId: profile.id });
        const query = `
        SELECT guild_id, owner_id
        FROM guild.allowed_guilds
        WHERE guild_id = '734281219839230022'
        `
        
        if(user)
        {
            console.log("User exists.");
            await user.updateOne({
                username: `${profile.username}#${profile.discriminator}`,
                guilds: profile.guilds.filter(guild => guild.id)
            });
            done(null, user);
        }
        else {
            console.log("User does not exist");
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username,
                guilds: profile.guilds
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    }
    catch(err) {
        console.log(err);
        done(err, null);
    }
}));