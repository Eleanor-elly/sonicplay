import mongoose from 'mongoose'
import moment from 'moment'

const UserSchema = mongoose.Schema({
    regType :{type : String},
    easyLogin : {type : String},
    userID : {type : String}, //email
    userPassword : {type : String}, //salt를 이용해 변형 한 값
    userSalt : {type : String},
    phoneVerified : {type : String},
    phone : {type : String},
    status : {type : String, default : 'normal'},
    activityLog : [
        new mongoose.Schema({
            purchase : [
                new mongoose.Schema({
                    contentsID : {type : String},
                    date : {type : String, default : moment().format('YYYY.MM.DD')}
                }, {_id : false})
            ],
           loginLog : [
               new mongoose.Schema({
                   os : {type : String},
                   ip : {type : String},
                   date : {type : String, default : moment().format('YYYY.MM.DD')}
               }, {_id : false})
           ],
            statusLog : [
                new mongoose.Schema({
                    status : {type : String},
                    date : {type : String, default : moment().format('YYYY.MM.DD')}
                }, {_id : false})
            ]
        })
    ],
    uuid : {type : String},
    clientID : {type : String},
    token : {type : String},
    regDate : {type : String, default : moment().format('YYYY.MM.DD')}
}, {collection : 'user'});


let UsersModel = mongoose.model('user', UserSchema);

UsersModel.addUser = (user) =>{
    return user.save();
};

UsersModel.getPassword = (email)=>{
    return UsersModel.find({userID : email},{userPassword : true, userSalt : true,  _id : false});
};

UsersModel.addPurchase = (email, purchases)=>{
    return UsersModel.update({userID : email}, {
        $push : {
            purchase : purchases
        }
    })
};



export default UsersModel;
