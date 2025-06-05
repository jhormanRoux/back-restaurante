// controllers/productosController.js
import Producto from '../models/producto.js';

// Obtener productos (disponibles o no)
export async function obtenerDisponibles(req, res) {
  try {
    let filtro = {};
    if (req.query.disponible !== undefined) {
      try {
        filtro.disponible = JSON.parse(req.query.disponible);
      } catch (parseError) {
        return res.status(400).json({ error: 'Parámetro disponible inválido' });
      }
    }
    const productos = await Producto.findAll({ where: filtro });
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos disponibles:', error);
    res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}


// Actualizar la disponibilidad de un producto
export const actualizarDisponibilidad = async (req, res) => {
  const { id } = req.params;
  const { disponible } = req.body;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    producto.disponible = disponible;
    await producto.save();

    res.json({ message: 'Disponibilidad actualizada', producto });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar disponibilidad' });
  }
};

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
  const { nombre, categoria_id, disponible } = req.body;

  try {
    const nuevoProducto = await Producto.create({ nombre, categoria_id, disponible });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    await producto.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};
