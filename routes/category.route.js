import express from 'express'
import CategoryController from '../controllers/category.controller'

const router = express.Router();

router.get('/', (req, res)=>{
    CategoryController.getCategories(req, res)
});

router.post('/', (req, res)=>{
    CategoryController.addCategory(req, res)
});

router.post('/edit', (req, res)=>{
    CategoryController.editCategory(req, res)
});

router.post('/del', (req, res)=>{
    CategoryController.delCategory(req, res)
});

router.post('/remove', (req, res)=>{
    CategoryController.removeCategory(req, res)
});

export default router;
