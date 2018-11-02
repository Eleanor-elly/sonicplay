import mongoose from 'mongoose'
import moment from 'moment'

const HomeSchema = mongoose.Schema({
    title : {type : String},
    fileName : {type : String},
    filePath : {type : String},
    fileType : {type : String},
    fileSize : {type : String},
    fileOriginalName : {type : String},
    linkUrl : {type : String},
    sDate : {type : String},
    eDate : {type : String},
    regDate : {type : String, default : moment().format('YYYY.MM.DD')},
    status : {type : String},
    standardFlag : {type : String}
}, {collection : 'banner'});

let HomeModel = mongoose.model('banner', HomeSchema);

export default HomeModel;
