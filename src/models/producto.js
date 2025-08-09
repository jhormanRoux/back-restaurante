import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  categoria_id: {  // ✅ en minúsculas igual que en la base de datos
    type: DataTypes.INTEGER
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'productos',
  timestamps: false,
});

export default Producto;



