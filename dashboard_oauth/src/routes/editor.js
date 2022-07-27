const router = require('express').Router();
const { getPermissions } = require('../utils/utils');

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

router.get('/', isAuthorized, (req, res) => {

    const { guilds } = req.user;
    const guildMemberPermissions = new Map();
    guilds.forEach(guild => {
        const perm = getPermissions(guild.permissions);
        guildMemberPermissions.set(guild.id, perm);
    });

    res.render('editor', {
        username: req.user.username,
        discordId: req.user.discordId,
        guilds: req.user.guilds,
    });
});

module.exports = router;