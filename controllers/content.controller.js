import Contents from '../models/contents.model'
import logger from '../core/logger/app-logger'
import mime from 'mime'
import fs from 'fs'
import gm from 'gm'
import audioDuration from 'get-audio-duration'
import ffprobe from 'ffprobe'
import ffprobeStatic from 'ffprobe-static'
import archiver from 'archiver'
let archive = archiver('zip');


const controller = {};

controller.getFree = async (req, res) =>{
    let result = [];
    try{
        let freeContents = await Contents.getFree();
        logger.info('Selecting Free Contents');

        let dirname = __dirname.substring(0,__dirname.lastIndexOf("/")+1);
        freeContents.forEach((contents)=>{
            if(contents.type == "single"){
                let path = contents.clipInfo[0].filePath;
                contents.clipInfo[0].filePath = dirname + path;
            }else {
                let path = contents.subProduct[0].filePath;
                contents.subProduct[0].filePath = dirname + path;
            }
        });

        result.push({result : 'success', freeContents});
        res.send(result)
    }catch (e) {
        console.log(e);
        logger.error('Error occur Selecting Free Contents');
        result.push({result : 'failed', Message : e});
        res.send(result);
    }
};

controller.getCharge = async (req, res) =>{
    let result = [];
    try{
        let ChargeContents = await Contents.getCharge();
        logger.info('Selecting Charge Contents');
        result.push({result : 'success', ChargeContents});
        res.send(result)
    }catch (e) {
        console.log(e);
        logger.error('Error occur Selecting Charge Contents');
        result.push({result : 'failed', Message : e});
        res.send(result);
    }
};

controller.getPopular = async (req, res) =>{
    let result = [];
    try {
        let popular = await Contents.getPopular();
        logger.info('Selecting Popular Contents');
        result.push({result : 'success', popular});
        res.send(result);
    }catch (e) {
        console.log(e);
        logger.error('Error occur Selecting popular Contents');
        result.push({result : 'failed', Message : e});
        res.send(result);
    }
};


controller.getAll = async (req, res) =>{
    let result = [];
    let dirname = __dirname.substring(0,__dirname.lastIndexOf("/")+1);
    try{
        let allContents = await Contents.getAll();
        logger.info('Selecting All Contents');
        let dirname = __dirname.substring(0,__dirname.lastIndexOf("/")+1);
        allContents.forEach((contents)=>{
            contents.type == "single" && contents.amount ==0 ? contents.clipInfo[0].filePath = dirname +contents.clipInfo[0].filePath  : contents.clipInfo = '';
            contents.type == "package" && contents.amount ==0 ? contents.subProduct[0].filePath = dirname + contents.subProduct[0].filePath : contents.subProduct = '';

        });
        result.push({result : 'success', allContents});
        res.send(result);
    }catch (e) {
        console.log(e);
        logger.error('Error occur Selecting all Contents');
        result.push({result : 'failed', Message : e});
        res.send(result);
    }
};















/* single contents method*/

controller.test = async (req, res, info) =>{
    console.log(info.title);
    res.send("upload!")
};

//
controller.addClip = async (req, res) =>{
    console.log('gg');
    let result = [];
    let dirname = __dirname.substring(0,__dirname.lastIndexOf("/")+1);
    console.log(dirname);
    console.log(req.file.path);
    console.log(req.file.originalname);
    ffprobe(dirname + 'uploads/contents/'+req.file.filename+'.wav', {path : ffprobeStatic.path})
        .then( (info)=>{
            console.log(info)
        });
    audioDuration(dirname + 'uploads/contents/'+req.file.filename).then((duration)=>{
        console.log('atrarr');
        console.log(duration);
    });
    result.push({result : 'aaa'});
    let clip = Contents({
        clipInfo : [
            {
                title : req.file.originalname,
                duration : req.body.duration,
                fileName : req.file.filename,
                fileType : req.file.mimetype,
                fileSize : req.file.size,
                filePath : req.file.path
            }
        ],
        type : req.body.type,
        category : req.body.category,
        tag : req.body.tag,
        productName : req.body.productName,
        amount : req.body.amount,
        salesVol : req.body.salesVol,
        download : req.body.download,
        status : req.body.status,
        regDate: req.body.regDate
    });
    try{
        // let addContent = await Contents.addClip(clip);
        // logger.info('Adding content data ...');
        // result.push({result : 'success', addContent});
        // res.send(result);
        res.send(result);
    }catch (e) {
        logger.error('Error occur adding clip');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.delClip = async (req, res)=>{
    let clipId = req.body.clipId;
    let result = [];
    try{
        let clipFile = await Contents.clipFileInfo(clipId);
        let dirname = __dirname.substring(0,__dirname.lastIndexOf("/")+1);
        let filePath = dirname +clipFile[0].clipInfo[0].filePath;
        console.log(filePath);
         let delFile = fs.unlink(filePath, (err) =>{
             console.log('....???');
             if(err)throw err;
             console.log('successfully ');
         });
         let delContent = await Contents.delClip(clipId);
         logger.info('Deleting content...');
         result.push({result : 'success', delContent});
         res.send(result);
    }catch (e) {
        logger.error('Error occur deleting clip');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.editClip = async (req, res)=>{
    let category = req.body.category;
    let productName = req.body.productName;
    let amount = req.body.amount;
    let status = req.body.status;
    let tag = req.body.tag;
    let clipId = req.body.clipId;
    let download = req.body.download;
    let salesVol = req.body.salesVol;
    let result = [];
    try{
        let editContent = await Contents.editClip(category, productName, amount, status, tag, clipId, download, salesVol);
        logger.info('Editing content...');
        result.push({result : 'success', editContent});
        res.send(result);
    }catch (e) {
        logger.error('Error occur editing clip');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getUseableClips = async (req, res)=>{
    let result = [];
    try{
        let clips = await Contents.allUseClips();
        logger.info('All clip list');

        result.push({result : 'success', clips});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting all clip list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.freeUseableClips = async (req, res)=>{
    let result = [];
    try{
        let freeClips = await Contents.freeUseClips();
        logger.info('Free clip list');
        result.push({result : 'success', freeClips});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting free clip list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.chargedUseableClips = async (req, res)=>{
    let result = [];
    try{
        let chargeClips = await Contents.chargeUseClips();
        logger.info('Free clip list');
        result.push({result : 'success', chargeClips});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting free clip list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getClipInfo = async (req, res)=>{
    let clipId = req.body.clipId;
    console.log(clipId);
    let result = [];
    try{
        let clipInfo = await Contents.getClipInfo(clipId);
        logger.info('Get Clip Info : '+clipId);
        result.push({result: 'success', clipInfo});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting clip info : ' + clipId);
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

// - 사용/비사용 모두 보기
controller.getAllClips = async (req, res)=>{
    let result = [];
    try{
        let allClips = await Contents.getAllClips();
        logger.info('Get All Clips ');
        result.push({result : 'success', allClips});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting all clip ');
        console.log(e);
        result.push({result : 'fail', message: 'e'});
        res.send(result);
    }
};





/* package contents method*/

controller.testPackages = async (req, res) =>{
    let sub = new Array();
    req.body.subProduct.forEach(product =>{
        sub.push({
            title : product.title,
            duration : product.duration,
            fileName : product.fileName,
            fileType : product.fileType,
            fileSize : product.size,
            filePath : product.path
        })
    });
    let pack = Contents({
        subProduct : sub,
        type : req.body.type,
        category : req.body.category,
        tag : req.body.tag,
        productName : req.body.productName,
        amount : req.body.amount,
        salesVol : req.body.salesVol,
        download : req.body.download,
        status : req.body.status,
        regDate: req.body.regDate
    });
    try {
        let a = await Contents.testPack(pack);
        res.send(a);
    }catch (e) {
        res.send("error!")
    }
};


controller.addPackage = async (req, res) =>{
    let sub = new Array();
    let dirname = __dirname.substring(0,__dirname.lastIndexOf("/")+1);
    let output = fs.createWriteStream(dirname + '/uploads/contents/packages/'+req.body.productName+'.zip');
    archive.pipe(output);

    let getStream = (fileName) =>{
        return fs.readFileSync(fileName);
    };

    let fileNames = [];

    req.body.subProduct.forEach(product =>{
        sub.push({
            title : product.title,
            duration : product.duration,
            fileName : product.fileName,
            fileType : product.fileType,
            fileSize : product.size,
            filePath : product.path
        });
        fileNames.push(product.title);
    });

    req.body.subProduct.forEach(product =>{
        fileNames.forEach(()=>{
            let path = dirname + product.path;
            archive.append(getStream(path), {name : fileNames});
        })
    });

    archive.finalize((err, bytes)=>{
        if(err){
            throw err;
        }

        console.log(bytes + ' total bytes');
    });

    console.log(fileNames);

    let result = [];
    let packages = Contents({
        subProduct : sub,
        type : req.body.type,
        category : req.body.category,
        tag : req.body.tag,
        productName : req.body.productName,
        amount : req.body.amount,
        salesVol : req.body.salesVol,
        download : req.body.download,
        status : req.body.status,
        regDate: req.body.regDate
    });
    try{
        let addPackage = await Contents.addPackage(packages);
        logger.info('Adding package data ...');
        result.push({result : 'success', addPackage});
        res.send(result);
    }catch (e) {
        logger.error('Error occur adding package');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.delPackage = async (req, res)=>{
    let packageId = req.body.packageId;
    let result = [];
    try{
        let delPackage= await Contents.delPackage(packageId);
        logger.info('Deleting package...');
        result.push({result : 'success', delPackage});
        res.send(result);
    }catch (e) {
        logger.error('Error occur deleting package');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getUsePackages = async (req, res)=>{
    let result = [];
    try{
        let packages = await Contents.allUsePackages();
        logger.info('All use package list');
        result.push({result : 'success', packages});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting all use package list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getFreePackages = async (req, res)=>{
    let result = [];
    try{
        let freePackage = await Contents.freeUsePackages();
        logger.info('Free package list');
        result.push({result : 'success', freePackage});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting free package list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getChargePackages = async (req, res)=>{
    let result = [];
    try{
        let chargePackages = await Contents.chargeUsePackages();
        logger.info('Free package list');
        result.push({result : 'success', chargePackages});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting free package list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getPackage = async (req, res)=>{
    let packageId = req.params.packageId;
    let result = [];
    try{
        let packageInfo = await Contents.getPackageInfo(packageId);
        logger.info('Get package Info : '+packageId);
        result.push({result: 'success', packageInfo});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting package info : ' + packageId);
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

// - 사용/비사용 모두 보기
controller.getAllPackages = async (req, res)=>{
    let result = [];
    try{
        let allPackages = await Contents.getAllPackages();
        logger.info('Get All Packages ');
        result.push({result : 'success', allPackages});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting all packages ');
        console.log(e);
        result.push({result : 'fail', message: 'e'});
        res.send(result);
    }
};


controller.editPackage = async (req, res)=>{
    let sub = new Array();
    req.body.subProduct.forEach(product =>{
        sub.push({
            title : product.title,
            duration : product.duration,
            fileName : product.fileName,
            fileType : product.fileType,
            fileSize : product.fileSize,
            filePath : product.filePath
        })
    });
    let category = req.body.category;
    let productName = req.body.productName;
    let amount = req.body.amount;
    let status = req.body.status;
    let tag = req.body.tag;
    let packageId = req.body.packageId;
    let subProduct = sub;
    let salesVol = req.body.salesVol;
    let download = req.body.download;
    let result = [];
    try{
        let editPackage = await Contents.editPackage(category, productName, amount, status, tag, packageId, subProduct, download, salesVol);
        logger.info('Editing package...');
        result.push({result : 'success', editPackage});
        res.send(result);
    }catch (e) {
        logger.error('Error occur editing package');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

controller.getContents = async (req, res)=>{
    let result = [];
    let typeParam = req.body.type;
    let types;
    let chargedParam = req.body.charged;
    let charged;
    if(typeParam === 'single'){
        types = 'clip';
    }else if (typeParam === 'package') {
        types = 'package'
    }else {
        types = null;
    }

    if(chargedParam === 'yes'){
        charged = '$gt'
    }else if(chargedParam === 'no') {
        charged = '$eq'
    }else {
        charged = '$gte'
    }
    try{
        let contents = await Contents.getContents(types, charged);
        logger.info('Find contents - ');
        result.push({result : 'success', contents});
        res.send(result);
    }catch (e) {
        logger.error('Error occur finding contents');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

controller.getUri = async (req, res)=>{
    let result = [];
    let clipId = req.body.clipId;
    console.log(clipId);
    try{
        let contents = await Contents.getUris(clipId);
        let dirname = __dirname.substring(0,__dirname.lastIndexOf("/")+1);
        console.log(dirname);

        let and = contents.map((obj)=>{
           let info = {};
           info = {title : obj.clipInfo[0].title,
               url : dirname+obj.clipInfo[0].filePath};
           return info;
        });

        console.log(and);
        result.push({result : 'success', url :  and});
        res.send(result);
    }catch (e) {
        logger.error('Error occur finding uri - ');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

controller.downloads = async (req, res)=>{



};
export default controller;
