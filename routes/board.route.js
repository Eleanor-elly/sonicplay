import boardController from '../controllers/board.controller'
import express from 'express'

const router = express.Router();

/* notice method */
router.get('/notice', (req, res)=>{
    return boardController.getNotice(req, res);
});

router.get('/allnotice', (req, res)=>{
    return boardController.getAllNotice(req, res);
});

router.post('/notice', (req, res)=>{
    return boardController.addNotice(req, res);
});

router.post('/editnotice', (req, res)=>{
    return boardController.editNotice(req, res);
});

router.post('/delnotice', (req, res)=>{
    return boardController.delNotice(req, res);
});


/* FAQ method */
router.get('/faq', (req, res)=>{
    return boardController.getFAQ(req, res);
});

router.get('/allfaq', (req, res)=>{
    return boardController.getAllFAQ(req, res);
});

router.post('/faq', (req, res)=>{
    return boardController.addFAQ(req, res);
});

router.post('/editfaq', (req, res)=>{
    return boardController.editFAQ(req, res);
});

router.post('/delfaq', (req, res)=>{
    return boardController.delFAQ(req, res);
});



/* Inquiry method */
router.get('/inquiry', (req, res)=>{
    return boardController.getInquiry(req, res);
});

router.get('/allinquiry', (req, res)=>{
    return boardController.getAllInquiry(req, res);
});

router.post('/inquiry', (req, res)=>{
    return boardController.addInquiry(req, res);
});

router.post('/editinquiry', (req, res)=>{
    return boardController.editInquiry(req, res);
});

router.post('/delinquiry', (req, res)=>{
    return boardController.delInquiry(req, res);
});

// ---------------- inquiry reply ---------

router.post('/inquiry/reply', (req, res)=>{
    return boardController.addReply(req, res);
});

router.post('/inquiry/editreply', (req, res)=>{
    return boardController.editReply(req, res);
});

router.post('/inquirt/delreply', (req, res)=>{
    return boardController.delReply(req, res);
});


/* Refund method */
router.get('/refund', (req, res)=>{
    return boardController.getRefund(req, res);
});

router.get('/allrefund', (req, res)=>{
    return boardController.getAllRefund(req, res);
});

router.post('/refund', (req, res)=>{
    return boardController.addRefund(req, res);
});

router.post('/editrefund', (req, res)=>{
    return boardController.editRefund(req, res);
});

router.post('/delrefund', (req, res)=>{
    return boardController.delRefund(req, res);
});

// ---------------- refund reply ---------

router.post('/refund/reply', (req, res)=>{
    return boardController.addReply(req, res);
});

router.post('/refund/editreply', (req, res)=>{
    return boardController.editReply(req, res);
});

router.post('/refund/delreply', (req, res)=>{
    return boardController.delReply(req, res);
});


/* Sale method */
router.get('/sale', (req, res)=>{
    return boardController.getSale(req, res);
});

router.get('/allsale', (req, res)=>{
    return boardController.getAllSale(req, res);
});

router.post('/sale', (req, res)=>{
    return boardController.addSale(req, res);
});

router.post('/editsale', (req, res)=>{
    return boardController.editSale(req, res);
});

router.post('/delsale', (req, res)=>{
    return boardController.delSale(req, res);
});



/* Member method */
router.get('/member', (req, res)=>{
    return boardController.getMember(req, res);
});

router.get('/allmember', (req, res)=>{
    return boardController.getAllMember(req, res);
});

router.post('/member', (req, res)=>{
    return boardController.addMember(req, res);
});

router.post('/editmember', (req, res)=>{
    return boardController.editMember(req, res);
});

router.post('/delmember', (req, res)=>{
    return boardController.delMember(req, res);
});

//회원1명의 상세정보
router.get('/member/:memberId', (req, res)=>{
    return boardController.getMemberInfo(req, res);
});



/* Category method */
router.get('/category', (req, res)=>{
    return boardController.getCategory(req, res);
});

router.get('/allcategory', (req, res)=>{
    return boardController.getAllCategory(req, res);
});

router.post('/category', (req, res)=>{
    return boardController.addCategory(req, res);
});

router.post('/editcategory', (req, res)=>{
    return boardController.editCategory(req, res);
});

router.post('/delcategory', (req, res)=>{
    return boardController.delCategory(req, res);
});



/* Policy method */
router.get('/policy', (req, res)=>{
    return boardController.getPolicy(req, res);
});

router.get('/allpolicy', (req, res)=>{
    return boardController.getAllPolicy(req, res);
});

router.post('/policy', (req, res)=>{
    return boardController.addPolicy(req, res);
});

router.post('/editpolicy', (req, res)=>{
    return boardController.editPolicy(req, res);
});

router.post('/delpolicy', (req, res)=>{
    return boardController.delPolicy(req, res);
});



export default router;

