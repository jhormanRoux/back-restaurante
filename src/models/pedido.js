// models/pedido.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Pedido = sequelize.define('Pedido', {
  principio_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  proteina_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bebida_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mesa: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'completado'),
    defaultValue: 'pendiente'
  },
  fecha_pedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'pedidos',
  timestamps: false
});


export default Pedido;
