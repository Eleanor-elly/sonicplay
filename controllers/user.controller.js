import Users from '../models/user.model'
import logger from '../core/logger/app-logger'
import crypto from "crypto";
const controller = {};

controller.join = async (req, res)=>{
    let result = [];
    let salt = Math.round(new Date().valueOf() * Math.random())+'';
    let password = req.body.userPassword;
    let saltPassword = crypto.createHash("sha512").update(password+salt).digest('hex');

    let user = Users({
        regType : req.body.regType,
        easyLogin : req.body.easyLogin,
        userID : req.body.userID,
        userPassword : saltPassword, //salt를 이용해 변형 한 값
        userSalt : salt,
        phoneVerified : req.body.phoneVerified,
        phone : req.body.phone,
        status : req.body.status,
        activityLog : [
            ({
                loginLog : [
               ({
                        os : req.body.os,
                        ip : req.body.ip,
                        date : req.body.date
                        }, {_id : false})
                ],
                statusLog : [({
                        status : req.body.statusLog,
                        date : req.body.date
                    }, {_id : false})
                ]
            })
        ],
        uuid : req.body.uuid,
        clientID : req.body.clientID,
        token : req.body.token,
        regDate : req.body.regDate
    });

    try{
        let addUser = await Users.addUser(user);
        logger.info('Adding user - ');
        result.push({result : 'success', addUser});
        res.send(result);
    }catch (e) {
        logger.error('Error occur adding user');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

controller.login = async (req, res)=>{
    let result = [];
    let email = req.body.userID;
    let inputPW = req.body.userPassword;

    try{
        let password = await Users.getPassword(email);
        let inputPWSalt = crypto.createHash("sha512").update(inputPW + password[0].userSalt).digest('hex');
        console.log(password[0].userSalt);
        if(password[0].userPassword === inputPWSalt ){
            result.push({result : 'success'});
        }else{
            result.push({result : 'fail', message : 'PW is not match'})
        }
        res.send(result);
    }catch (e) {
        logger.error('Error occur adding user');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

controller.addPurchase = async (req, res)=>{
    let email = req.body.userID;
    let result = [];
    let purchases = new Array();
    req.body.purchase.forEach(product =>{
        purchases.push({
            contentsID : product.contentsID,
            date : product.date
        })
    });

    try{
        let addPurchase = await Users.addPurchase(email, purchases);
        logger.info('Adding Purchase - ');
        result.push({result : 'success', addPurchase});
        res.send(result);
    }catch (e) {
        logger.error('Error occur adding user- purchase');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};
export default controller;
