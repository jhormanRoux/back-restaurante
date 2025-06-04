// db.js
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa!');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });


export default sequelize;
