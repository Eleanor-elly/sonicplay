import Category from '../models/category.model'
import logger from '../core/logger/app-logger'

const controller = {};

controller.addCategory = async (req, res) =>{
    let result = [];
    let category = Category({
        name : req.body.name,
        nameKR : req.body.nameKR,
        clipCount : req.body.clipCount,
        status : req.body.status,
        regDate : req.body.regDate
    });
    try{
        let add = await Category.addCategory(category);
        logger.info('Adding category');
        result.push({result : 'success', add});
        res.send(result);
    }catch (e) {
        logger.error('Error occur adding category');
        console.log(e);
        result.push({result : 'failed', message : e});
        res.send(result)
    }
};

//카테고리 진짜 삭제
controller.delCategory = async (req, res)=>{
    let result = [];
    let categoryId = req.body.categoryId;
    try{
        let del = await Category.delCategory(categoryId);
        logger.info('Deleting category');
        result.push({result : 'success', del});
        res.send(result)
    }catch (e) {
        logger.error('Error occur deleting category');
        console.log(e);
        result.push({result : 'failed', message : e});
        res.send(result)
    }
};

controller.getCategories = async (req, res)=>{
    let result = [];
    try{
        let list = await Category.getCategories();
        logger.info('Selecting category');
        result.push({result : 'success', list});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting category');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};


controller.delCategory = async (req, res)=>{
    let result = [];
    let categoryId = req.body.categoryId;
    try{
        let result = await Category.editStatus(categoryId);

    }catch (e) {
        logger.error('Error occur deleting category');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

/*

클립카운트 수정
1. 클립을 등록하였을 때
클립에 등록 된 카테고리명으로 검색
기존 카테고리에 + 1

2. 클립을 삭제했을 때
클립에 등록 된 카테고리명으로 검색
기존 카테고리에 - 1

이 부분은 클립 추가/삭제 프로세스가 일어나면서 같이 되야하는 부분이므로, 컨텐츠쪽에서 작성

*/



export default controller;
