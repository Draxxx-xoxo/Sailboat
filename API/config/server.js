module.exports = ({ env }) => ({
  host: env('HOST', '192.53.174.37'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
