import moment from 'moment'
import Board from '../models/board.model'
import logger from '../core/logger/app-logger'

const controller = {};

// 공지사항, FAQ 등 댓글이 필요없는 게시글 without file
controller.addPost = async (req, res) =>{
    let result = [];
    let post  = Board({
        type : req.body.type,
        title : req.body.title,
        contents : req.body.contents,
        status : req.body.status,
        process : req.body.process,
        regDate : req.body.regDate
    });
    try{
        let add = await Board.addPost(post);
        logger.info('Adding post without file');
        result.push({result : 'success', add});
        res.send(result);
    }catch (e) {
        logger.error('Error occur adding post without file');
        console.log(e);
        result.push({result : 'failed', message : e});
        res.send(result);
    }
};

controller.addPostWithFiles = async (req, res) =>{
    let result = [];
    let post = Board({
        type : req.body.type,
        title : req.body.title,
        contents : req.body.contents,
        attach : [
            {
                fileName : req.file.filename,
                filePath : req.file.path,
                fileType : req.file.mimetype,
                fileOriginalName : req.file.originalname
            }

        ],
        regDate : req.body.regDate,

    })
};
export default controller;
