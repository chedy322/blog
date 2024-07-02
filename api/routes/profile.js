const express=require('express')
const {getPublic,getPublicById}=require('../controllers/main')
const router=express.Router()


router.route('/').get(getPublic)
router.route('/:id').get(getPublicById)
module.exports=router;