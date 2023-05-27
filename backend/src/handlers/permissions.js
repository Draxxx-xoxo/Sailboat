const fs = require("fs");
const functions = require("./pg");

async function pg_table(permissions_level, guildid){
  const pg = await functions.pg(`SELECT role_id, guild_id, permission_id, name, description, level FROM public.role_permissions JOIN bot_permissions d USING (permission_id) WHERE "guild_id" = ${guildid} AND "level" BETWEEN ${permissions_level} AND 200`)
  const config = pg.rows
  return config 
}

module.exports = {
  permission: async (discordclient, permission_level, guildid, user) => {
    const config = await pg_table(permission_level, guildid)
    var vaild = false
    for(i = 0; i < config.length; i++){
      if(user.roles.cache.has(`${config[i].role_id}`)){
        vaild = true
        break;
      } else {
        vaild = false
      }
    }
    return vaild
  },
};
