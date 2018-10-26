import contentController from '../controllers/content.controller'
import express from 'express'
import multer from 'multer'
import uuidv4 from 'uuid/v4'
import path from 'path'

let upload = multer({dest : 'uploads/contents/'});
//
// let storage = multer.dickStorage({
//     destination : (req, file, cb)=>{
//         cb(null, './uploads/contents')
//     }
// });

const router = express.Router();

/* single contents method*/

router.post('/test',upload.single('contents'), (req, res)=>{
    let info = {};
    info = {
        title : req.file.originalname,
        fileType : req.file.mimetype,
        fileName : req.file.filename,
        filePath : req.file.path,
    };
    contentController.test(req, res, info);
}); //test

router.post('/clip', upload.single('contents'), (req, res)=>{
    contentController.addClip(req, res);
}); //단일컨텐츠 추가

router.post('/clipdel', (req, res)=>{
    contentController.delClip(req, res);
}); //단일컨텐츠 삭제

router.post('/clipedit', (req, res)=>{
    contentController.editClip(req, res)
}); //단일컨텐츠 수정

router.get('/clips', (req, res)=>{
    contentController.getClips(req, res)
}); //단일컨텐츠 모든 목록

router.get('/clipfree', (req, res)=>{
    contentController.getFreeClips(req, res)
}); //단일컨텐츠 무료 목록

router.get('/clipcharge', (req, res)=>{
    contentController.getChargeClips(req, res)
}); //단일컨텐츠 유료 목록

router.get('/clip/:clipId', (req, res)=>{
    contentController.getClip(req, res)
}); //단일컨텐츠 해당 컨텐츠 정보

router.get('/allclips', (req, res)=>{
    contentController.getAllClips(req, res);
});

/* package contents method*/

router.post('/packageTest',(req, res)=>{
    contentController.testPackages(req, res);
}); //test

router.post('/package', (req, res)=>{
    contentController.addPackage(req, res);
});

router.post('/packagedel', (req, res)=>{
    contentController.delPackage(req, res);
});

router.post('/packageedit', (req, res)=>{
    contentController.editPackage(req, res)
});

router.get('/packages', (req, res)=>{
    contentController.getUsePackages(req, res)
});

router.get('/packagefree', (req, res)=>{
    contentController.getFreePackages(req, res)
});

router.get('/packagecharge', (req, res)=>{
    contentController.getChargePackages(req, res)
});

router.get('/package/:packageId', (req, res)=>{
    contentController.getPackage(req, res)
});

router.get('/allpackages', (req, res)=>{
    contentController.getAllPackages(req, res);
});

export default router;
