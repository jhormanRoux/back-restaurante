// routes/pedidoRoutes.js

import { Router } from 'express';


import {
    getPedidosConNombres,
    crearPedido,
    actualizarEstadoPedido,
    eliminarPedidosCompletados
  } from '../controllers/pedidoController.js';


const router = Router();

router.get('/', getPedidosConNombres);
router.post('/', crearPedido); // POST /api/pedidos
router.put('/:id', actualizarEstadoPedido);
router.delete('/completados', eliminarPedidosCompletados);
export default router;
