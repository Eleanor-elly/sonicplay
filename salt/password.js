import crypto from 'crypto';

let salt = Math.round((new Date().valueOf()*Math.random()))+'';
let password = crypto.createHash('sha512').update('qwerty'+salt).digest('hex');
let inputpass = 'qwerty';

console.log('[1] Salt Length : '+salt.length);
console.log('[2] Encrypted Password : '+mypass);
if( crypto.createHash('sha512').update(inputpass+salt).digest('hex')==password){
    console.log('login success');
}else{
    console.log('login fail...');
}


let salt = {};

salt.createSalt = async (password) =>{
    let salt = Math.round(new Date().valueOf() * Math.random())+'';
    let saltPass = crypto.createHash("sha512").update(password+salt).digest('hex');


};
