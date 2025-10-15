import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias', // 👈 nombre exacto de la tabla en la BD
      key: 'id',
    },
    onDelete: 'CASCADE',   // Si se borra la categoría, borra sus productos
    onUpdate: 'CASCADE',   // Si cambia el ID, lo actualiza también
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'productos', // 👈 asegura el nombre correcto
  timestamps: false,
});

export default Producto;
