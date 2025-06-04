// models/categoria.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Producto from './producto.js';

const Categoria = sequelize.define('Categoria', {
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: false, // Desactivar createdAt/updatedAt
});

// Relación: Una Categoria tiene muchos Productos
Categoria.hasMany(Producto, { foreignKey: 'categoria_id', as: 'productos' });

export default Categoria;
