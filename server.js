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

  app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});


  // Rutas
  app.use('/api/categorias', categoriaRoutes);
  app.use('/api/productos', productoRouter);
  app.use('/api/pedidos', pedidoRoutes);
  

 

  // Conexión a la base de datos y ejecución del servidor
 // ...

// Conexión a la base de datos y ejecución del servidor
sequelize.sync()
  .then(() => {
    const PORT = process.env.PORT || 3000;  // <-- Usa variable de entorno PORT o 3000 si local
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  });
