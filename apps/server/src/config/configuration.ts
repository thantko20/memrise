import { config } from './typeorm';

export default () => ({
  port: parseInt(process.env.PORT as string | never, 10) || 3000,
  db_connection: process.env.DB_CONNECTION,
  jwt_secret: process.env.JWT_SECRET,
  typeorm: config,
});
