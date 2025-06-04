  import express from 'express';
  import sequelize from './src/config/db.js';
  import categoriaRoutes from './src/routes/categoriaRoutes.js';
  import productoRouter from './src/routes/productosRouter.js';
  import pedidoRoutes from './src/routes/pedidoRoutes.js';
  import cors from 'cors';

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Rutas
  app.use('/api/categorias', categoriaRoutes);
  app.use('/api/productos', productoRouter);
  app.use('/api/pedidos', pedidoRoutes);
 

  // Conexión a la base de datos y ejecución del servidor
  sequelize.sync()
    .then(() => {
      app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
      });
    })
    .catch((err) => {
      console.error('Error al conectar a la base de datos:', err);
      process.exit(1); // Salir con código de error
    });
