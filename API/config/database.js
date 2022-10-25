module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'sailboat'),
      user: env('DATABASE_USERNAME', 'jovan_wee'),
      password: env('DATABASE_PASSWORD', 'b747400s'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
