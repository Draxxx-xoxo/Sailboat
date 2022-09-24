const {pgkey} = require("../../config.json")
const {Client} = require("pg");


module.exports = {
  pg: async (query) => {

    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });

    await client.connect();
    const pgquery = query;
    const row = await client.query(pgquery).catch(console.error);
    client.end();

    return row

  }
};