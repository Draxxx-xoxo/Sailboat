module.exports = {
    async getPreix(serverID, client){
        var prefix_query = `SELECT prefix FROM guild_settings.prefix WHERE server_id = '${serverID}'`;
        const res = await client.query(prefix_query).catch(console.error);
        
        for (let row of res.rows) {
            return row.prefix
          }

        
    },
}