import express from 'express';
import userController from '../controllers/user.controller'

const router = express.Router();

/* join */

router.post('/join', (req, res)=>{
    userController.join(req, res);
});

router.post('/login', (req, res)=>{
    userController.login(req, res);
});

router.post('/addpurchase', (req, res)=>{
    userController.addPurchase(req, res)
});

export default router;
