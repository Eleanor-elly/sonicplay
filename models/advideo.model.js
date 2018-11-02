import mongoose from 'mongoose'
import moment from 'moment'

const AdVideoSchema = mongoose.Schema({
    title : {type : String},
    fileName : {type : String},
    filePath : {type : String} ,
    fileType : {type : String},
    fileSize : {type : String},
    fileOriginalName : {type : String},
    description : {type : String},
    status : {type : String},
    regDate : {type : String, default : moment().format('YYYY.MM.DD')},
    standardFlag : {type : String}
},{collection : 'advideo'});
