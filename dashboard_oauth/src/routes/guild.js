const router = require('express').Router();
const { getPermissions } = require('../utils/utils');
const {Client} = require('pg');


function isAuthorized(req, res, next) {
    if(req.user) {
        console.log("User is logged in.");
        console.log(req.user)
        next();
    }
    else {
        console.log("User is not logged in.");
        res.redirect('/');
    }
}

router.get('/infractions', isAuthorized, async (req, res) => {

    const client = new Client({
        user: process.env.user,
        host: process.env.host,
        database: process.env.db,
        password: process.env.passwd,
        port: process.env.port,
    }); 
    client.connect();
    
    const guildid = req.baseUrl.slice(1)
    const queryGuild = `SELECT * FROM allowed_guilds JOIN  allowed_users d USING (guild_id) WHERE d.guild_id = ${guildid}`;
    const res_guild = await client.query(queryGuild);

    client.end()
    console.log(queryGuild);
    console.log(res_guild.rows)


    res.render('infractions', {
        username: req.user.username,
        discordId: req.user.discordId,
        guilds: req.user.guilds,
    });
});

router.get('/add_user', isAuthorized, async (req, res) => {

    const client = new Client({
        user: process.env.user,
        host: process.env.host,
        database: process.env.db,
        password: process.env.passwd,
        port: process.env.port,
    }); 
    client.connect();
    
    const guildid = req.baseUrl.slice(1)
    const queryGuild = `SELECT * FROM allowed_guilds JOIN  allowed_users d USING (guild_id) WHERE d.guild_id = ${guildid}`;
    const res_guild = await client.query(queryGuild);

    client.end()
    console.log(queryGuild);
    console.log(res_guild.rows)


    res.render('add_user', {
        username: req.user.username,
        discordId: req.user.discordId,
        guilds: req.user.guilds,
    });
});

router.get('/editor', isAuthorized, (req, res) => {

    res.render('editor', {
        username: req.user.username,
        discordId: req.user.discordId,
        guilds: req.user.guilds,
    });
});

module.exports = router;