import contentController from '../controllers/content.controller'
import express from 'express'
import multer from 'multer'
import fs from 'fs'
import Contents from "../models/contents.model";
import logger from "../core/logger/app-logger";

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

router.get('/testparam/:type/:charged', (req, res)=>{
    console.log(req.params);

    res.send(req.params);
});

router.post('/clip', upload.single('contents'), (req, res)=>{
    contentController.addClip(req, res);
}); //단일컨텐츠 추가

router.post('/delclip', (req, res)=>{
    contentController.delClip(req, res);
}); //단일컨텐츠 삭제

router.post('/editclip', (req, res)=>{
    contentController.editClip(req, res)
}); //단일컨텐츠 수정

router.get('/clips', (req, res)=>{
    contentController.getUseableClips(req, res)
}); //단일컨텐츠 모든 목록

router.get('/freeclips', (req, res)=>{
    contentController.freeUseableClips(req, res)
}); //단일컨텐츠 무료 목록

router.get('/chargedclips', (req, res)=>{
    contentController.chargedUseableClips(req, res)
}); //단일컨텐츠 유료 목록

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



//사용중인 모든 컨텐츠 (single, package)의 목록
router.post('/', (req, res)=>{
    contentController.getContents(req, res);
});

//컨텐츠의 해당 정보
router.post('/info', (req, res)=>{
    contentController.getClipInfo(req, res)
});

//컨텐츠의 위치정보 (구매하기 이후)
router.post('/geturi', (req, res)=>{
    contentController.getUri(req, res)
});

router.get('/download/:clipId', async (req, res)=>{
    let clipId = req.params.clipId;
    try{
        let contents = await Contents.getUris(clipId);

        let fileName = contents[0].clipInfo[0].title; //원본파일명
        let dirname = __dirname.substring(0,__dirname.lastIndexOf("/")+1);
        let filePath = dirname + 'uploads/contents';
        let fileServerName = contents[0].clipInfo[0].fileName;
        let file = filePath + '/' + fileServerName;

        res.download(file,fileName);
    }catch (e) {
        logger.error('Erro occur finding file - ');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
});

router.get('/test/test', (req, res)=>{
    fs.readFile('./downloadtest.html', (error, data)=>{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
export default router;
