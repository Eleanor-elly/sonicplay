import express from 'express'
import multer from 'multer'

let upload = multer({dest : 'uploads/advideo/'});

const router = express.Router();

export default router;
