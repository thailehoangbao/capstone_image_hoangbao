import express from 'express';
import { khoaApi } from '../config/jwt.js';
import { postComment ,getAllCommentsImage, deleteComment} from '../controllers/commentController.js';

const commentRoute = express.Router();
//Thêm comment vào ảnh
commentRoute.post('/post-comments/:image_id',khoaApi,postComment);

//Lấy thông tin các bình luận theo hình ảnh
commentRoute.get('/get-all-comments-image/:image_id',khoaApi,getAllCommentsImage);

//Delete the comment
commentRoute.delete('/delete-comment/:comment_id',khoaApi,deleteComment);


export default commentRoute;