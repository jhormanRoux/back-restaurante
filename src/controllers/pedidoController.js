// controllers/pedidoController.js

import Pedido from '../models/pedido.js';

export async function crearPedido(req, res) {
  try {
   const { principio_id, proteina_id, bebida_id, mesa } = req.body;

if (!principio_id || !proteina_id || !bebida_id || !mesa) {
  return res.status(400).json({ error: 'Faltan datos del pedido' });
}

const nuevoPedido = await Pedido.create({
  principio_id,
  proteina_id,
  bebida_id,
  mesa
});


    res.status(201).json({ message: 'Pedido creado con éxito', pedido: nuevoPedido });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}


import sequelize from '../config/db.js';

export const getPedidosConNombres = async (req, res) => {
  try {
    const [result] = await sequelize.query(`
      SELECT 
        pedidos.id,
        pedidos.mesa,
        p1.nombre AS principio,
        p2.nombre AS proteina,
        p3.nombre AS bebida,
        pedidos.estado
      FROM pedidos
      JOIN productos p1 ON pedidos.principio_id = p1.id
      JOIN productos p2 ON pedidos.proteina_id = p2.id
      JOIN productos p3 ON pedidos.bebida_id = p3.id
      ORDER BY pedidos.id DESC
    `);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};




// Función para actualizar el estado del pedido
export const actualizarEstadoPedido = async (req, res) => {
  const { id } = req.params; // Obtener el id del pedido de los parámetros
  const { estado } = req.body; // Obtener el nuevo estado del pedido del cuerpo de la solicitud

  try {
    // Buscar el pedido por su id
    const pedido = await Pedido.findByPk(id);

    // Si no se encuentra el pedido, devolver un error 404
    if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });

    // Actualizar el estado del pedido
    pedido.estado = estado;
    await pedido.save(); // Guardar el cambio en la base de datos

    // Responder con un mensaje de éxito
    res.json({ message: 'Pedido actualizado', pedido });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};



// Eliminar pedidos completados
export const eliminarPedidosCompletados = async (req, res) => {
  try {
    const eliminados = await Pedido.destroy({
      where: { estado: 'completado' }
    });

    res.json({ message: `${eliminados} pedidos completados eliminados.` });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar pedidos completados' });
  }
};
