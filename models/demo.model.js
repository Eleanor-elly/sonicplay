import mongoose from 'mongoose'
import moment from 'moment'

const DemoSchema = mongoose.Schema({
    title : {type : String},
    fileName : {type : String},
    filePath : {type : String},
    fileType : {type : String},
    fileSize : {type : String},
    fileOriginalName : {type : String},
    description : {type : String},
    regDate : {type : String, default : moment().format('YYYY.MM.DD')},
    status : {type : String},
    standardFlag : {type : String}
}, {collection : 'demo'});

let DemoModel = mongoose.model('demo', DemoSchema);

export default DemoModel;
