import express from 'express'
import CategoryController from '../controllers/category.controller'

const router = express.Router();

router.get('/', (req, res)=>{
    CategoryController.getCategories(req, res)
});

router.post('/', (req, res)=>{
    CategoryController.addCategory(req, res)
});
export default router;
