export default () => ({
  port: parseInt(process.env.PORT as string | never, 10) || 3000,
  db_connection: process.env.DB_CONNECTION,
});
