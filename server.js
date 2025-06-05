import express from 'express';
import sequelize from './src/config/db.js';
import categoriaRoutes from './src/routes/categoriaRoutes.js';
import productoRouter from './src/routes/productosRouter.js';
import pedidoRoutes from './src/routes/pedidoRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ✅ Configuración dinámica de CORS
const whitelist = [
  'http://localhost:5173',
  'https://frontend-restaurante.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman o servidor interno
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

// Rutas
app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRouter);
app.use('/api/pedidos', pedidoRoutes);

// Conexión a la base de datos y ejecución del servidor
sequelize.sync()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  });
