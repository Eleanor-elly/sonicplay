import mongoose from 'mongoose'

const BoardSchema = mongoose.Schema({
    category : {type : String},
    title : {type : String},
    contents : {type : String},
    reg_date : {type : String},
    attach : [{type : String}]
});

let BoardModel = {};
BoardModel.getModel = (types) =>{
    return mongoose.model(types,BoardSchema);
};


export default BoardModel;



