// routes/productosRouter.js
import express from 'express';
import {
  obtenerDisponibles,
  actualizarDisponibilidad,
  crearProducto,
  eliminarProducto
} from '../controllers/productosController.js';

const router = express.Router();

router.get('/', obtenerDisponibles); // GET /api/productos
router.put('/:id/disponibilidad', actualizarDisponibilidad); // PUT /api/productos/:id/disponibilidad
router.post('/', crearProducto); // POST /api/productos
router.delete('/:id', eliminarProducto); // DELETE /api/productos/:id

export default router;
