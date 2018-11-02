import express from 'express';
import demoController from '../routes/demo.route'

const router = express.Router();

router.post('/upload', (req, res)=>{

}); //데모 영상 올리기

router.post('/getdemo', (req, res)=>{

}); //데모영상 조회

router.post('/edit', (req, res)=>{

}); //데모영상 수정

router.post('/delete', (req, res)=>{

}); //데모영상 삭제 - 실제로는 수정 status만 변경


export default router;

