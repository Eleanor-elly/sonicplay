import express from 'express'
import multer from 'multer'

let upload = multer({dest : 'uploads/banner/'});

const router = express.Router();

router.post('/banner', upload.single('banner'), (req, res)=>{

}); //배너 업로드

router.post('/getbanner', (req, res)=>{

}); //배너 조회

router.post('/editbanner', (req, res)=>{

}); //배너 수정

router.post('/deletebanner', (req, res)=>{

}); //배너 삭제

router.post('/banner/getall', (req, res)=>{

}); //관리자용 모든 배너 조회

export default router;
