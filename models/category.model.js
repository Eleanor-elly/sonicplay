import mongoose from 'mongoose'
import moment from 'moment'

const category = mongoose.Schema({
    name : {type : String, default : 'default'},
    nameKR : {type : String, default : '기본'},
    clipCount : {type : Number, default : 0},
    status : {type : String, default : 'use'},
    regDate : {type : String, default : moment().format('YYYY.MM.DD')}
},{collection : 'category'});

let CategoryModel = mongoose.model('category', category);

CategoryModel.addCategory = (categories) =>{
    return categories.save();
};

//진짜 삭제
CategoryModel.delCategory = (categoryId)=>{
    return CategoryModel.remove({_id : categoryId});
};

CategoryModel.getCategories = ()=>{
    return CategoryModel.find({status : 'use'})
};

CategoryModel.editCategory = (categoryId, name, status) =>{
    return CategoryModel.update({_id : categoryId},{
        $set : {
            name : name,
            status : status
        }
    });
};

//카테고리의 클립 수 변경을 위해 클립 수만 조회
CategoryModel.getCategoryClipCount = (name) =>{
    return CategoryModel.find({name : name},{_id : false, clipCount : true})
};

//변경 해야 될 클립 수
CategoryModel.editClipCount = (categoryId, clipCount) =>{
    return CategoryModel.update({_id : categoryId}, {
        $set : {
            clipCount : clipCount
        }
    })
};

//임시삭제상태
CategoryModel.editStatus = (categoryId) =>{
    return CategoryModel.update({_id : categoryId},{
        $set: {
            status: 'delete'
        }
    })
};

export default CategoryModel;
