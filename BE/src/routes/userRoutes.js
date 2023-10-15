import express from 'express';
import {userSignUp,userLogin,getAllUsers,getInfoUser } from '../controllers/userController.js';
import { khoaApi } from '../config/jwt.js';


const userRoute = express.Router();
//Lấy danh sách tất cả người dùng
userRoute.get('/get-list-users',khoaApi, getAllUsers);

//Lấy thông tin user
userRoute.get('/get-info-user/:user_id', getInfoUser);

// signUp
userRoute.post('/sign-up',userSignUp);

//login
userRoute.post('/login',userLogin);





export default userRoute;