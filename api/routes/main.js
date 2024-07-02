const express=require('express');
const router=express.Router();
// const profile=require('../controllers/main')
const {getPostById,getPosts,profile,updatePost,create,deletePost}=require('../controllers/Post')

// router.route('/profile').get(profile)
router.route('/profile').get(profile)
router.route('/post').get(getPosts)
router.route('/post').post(create)
// router.route('/profile').get(profile)
//main with id 
router.route('/post/:id').get(getPostById)
.patch(updatePost)
.delete(deletePost)
// router.route('/create').post(create)




module.exports=router;


