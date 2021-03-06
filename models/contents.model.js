import mongoose from 'mongoose'
import moment from 'moment'
import logger from '../core/logger/app-logger'

const ContentsSchema = mongoose.Schema({
    clipInfo : [
        new mongoose.Schema({
            title : {type : String},
            duration : {type : String},
            fileName : {type : String},
            fileType : {type : String},
            fileSize : {type : Number},
            filePath : {type : String}
        },{_id : false})
    ],
    type : {type : String},
    category : {type : String},
    tag : [{type : String}],
    productName : {type : String},
    amount : {type : Number},
    salesVol : {type : Number, default : 0},
    download : {type : Number, default : 0},
    status : {type : String},
    regDate : {type : String, default : moment().format('YYYY.MM.DD')},
    zipPath : {type : String},
    subProduct : [
        new mongoose.Schema({
            title : {type : String},
            duration : {type : String},
            fileName : {type : String},
            fileType : {type : String},
            fileSize : {type : Number},
            filePath : {type : String}
        },{_id : false})
    ]
},{collection : 'contents'});

let ContentsModel = mongoose.model('contents', ContentsSchema);

ContentsModel.getFree = () =>{
    logger.info('in free contents');
    return ContentsModel.find({status : 'use', amount : 0})
};

ContentsModel.getCharge = () =>{
    return ContentsModel.find({status : 'use', amount : {$gt : 0}},{clipInfo : false, subProduct : false})
};
















/* single contents method*/
ContentsModel.addClip = (contents) =>{
    return contents.save();
};

ContentsModel.clipFileInfo = (clipId) =>{
    return ContentsModel.find({_id : clipId},{_id:false, clipInfo : true})
};

ContentsModel.delClip = (clipId) =>{
    return ContentsModel.remove({_id : clipId});
};

ContentsModel.allUseClips = () =>{
    return ContentsModel.find({status : 'use', type : 'single'});
};

ContentsModel.freeUseClips = () =>{
    return ContentsModel.find({amount : 0, status : 'use', type : 'single'})
};

ContentsModel.chargeUseClips = () =>{
    return ContentsModel.find({amount : {'$gt' : 0}, status : 'use', type : 'single'})
};


ContentsModel.getAllClips = () =>{
    return ContentsModel.find({type : 'single'});
};

ContentsModel.editClip = (category, productName, amount, status, tag, clipId, download, salesVol)=>{
    return ContentsModel.update({_id : clipId},{
        $set : {
            category : category,
            productName : productName,
            amount : amount,
            status : status,
            tag : tag,
            download : download,
            salesVol : salesVol
        }
    });
};


/* Package contents method*/

ContentsModel.testPack = (pack) =>{
    return pack.save();
};

ContentsModel.addPackage = (packages) =>{
    return packages.save();
};

ContentsModel.delPackage = (packageId) =>{
    return ContentsModel.remove({_id : packageId});
};

ContentsModel.allUsePackages = () =>{
    return ContentsModel.find({status : 'use' , type : 'package'});
};

ContentsModel.freeUsePackages = () =>{
    return ContentsModel.find({amount : 0, status : 'use', type : 'package'})
};

ContentsModel.chargeUsePackages = () =>{
    return ContentsModel.find({amount : {'$gt' : 0}, status : 'use', type : 'package'})
};

ContentsModel.getPackageInfo = (clipId) =>{
    return ContentsModel.find({_id : clipId});
};

ContentsModel.getAllPackages = () =>{
    return ContentsModel.find({type : 'package'});
};

ContentsModel.editPackage =
    (category, productName, amount, status, tag, packageId, subProduct, download, salesVol)=>{

    return ContentsModel.update({_id : packageId},{
        $set : {
            category : category,
            productName : productName,
            amount : amount,
            status : status,
            tag : tag,
            subProduct : subProduct,
            download : download,
            salesVol : salesVol
        }
    });
};

ContentsModel.getContents = (type, charged) =>{
    if(type === null){
        return ContentsModel.find({status : 'use', amount : { [charged] : 0}},
            {"clipInfo.filePath" : false, "subProduct.filePath" : false, "clipInfo.fileName" : false, "subProduct.fileName" : false});
    }else{
        return ContentsModel.find({status : 'use', type : type , amount : { [charged] : 0}},
            {"clipInfo.filePath" : false, "subProduct.filePath" : false, "clipInfo.fileName" : false, "subProduct.fileName" : false});
    }
};

ContentsModel.getClipInfo = (clipId) =>{
    return ContentsModel.find({_id : {$in : clipId}},{"clipInfo.filePath" : false, "subProduct.filePath" : false, "clipInfo.fileName" : false, "subProduct.fileName" : false});
};

ContentsModel.getUris = (clipId) =>{
    return ContentsModel.find({_id : clipId}, {type : true, productName : true, clipInfo : true, subProduct : true});
};

ContentsModel.getPopular = () =>{
    return ContentsModel.find({status : 'use'},{clipInfo : false, subProduct : false}).sort({download : -1});
};

ContentsModel.getAll = () =>{
    return ContentsModel.find({status : 'use'},{})
};


export default ContentsModel;
