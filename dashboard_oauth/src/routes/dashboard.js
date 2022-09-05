const router = require('express').Router();
const { getPermissions } = require('../utils/utils');
const {Client} = require('pg');

function isAuthorized(req, res, next) {
    if(req.user) {
        console.log("User is logged in.");
        //console.log(req.user);
        //console.log(req.user.discordId)
        next();
    }
    else {
        console.log("User is not logged in.");
        res.redirect('/');
    }
}

router.get('/admin', isAuthorized, (req, res) => {
    res.render('admin')
})

router.get('/', isAuthorized, async (req, res) => {

    /*const { guilds } = req.user;
    const guildMemberPermissions = new Map();
    guilds.forEach(guild => {
        const perm = getPermissions(guild.permissions);
        guildMemberPermissions.set(guild.id, perm);
    });*/


    const client = new Client({
        user: process.env.user,
        host: process.env.host,
        database: process.env.db,
        password: process.env.passwd,
        port: process.env.port,
    }); 
    
    client.connect();

    const queryGuild = `SELECT * FROM allowed_guilds JOIN  allowed_users d USING (guild_id) WHERE d.user_id = ${req.user.discordId}`;
    const res_guild = await client.query(queryGuild);

    client.end()

    res.render('dashboard', {
        username: req.user.username,
        discordId: req.user.discordId,
        guilds: res_guild.rows,
        //permissions: guildMemberPermissions,
    });

});

router.get('/settings', isAuthorized, (req, res) => {
    res.send(200);
});

module.exports = router;