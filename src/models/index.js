// models/index.js

import Producto from './producto.js';
import Categoria from './categoria.js';
import Pedido from './pedido.js';

// Asociar los modelos entre sí
Producto.associate({ Categoria, Pedido });  // Asegúrate de llamar a associate

export { Producto, Categoria, Pedido };
