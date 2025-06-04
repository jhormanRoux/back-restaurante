import express from 'express';
import { getAllCategorias, createCategoria } from '../controllers/categoriaController.js';

const router = express.Router();

router.get('/', getAllCategorias);
router.post('/', createCategoria);

export default router;
