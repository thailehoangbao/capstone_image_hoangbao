import express from 'express';
import { khoaApi } from '../config/jwt.js';
import upload from '../controllers/uploadController.js';
import { getAllImages,findImages,
    getInfoImageUser, 
    createImage,
    checkImageHasSave,
    saveImage,
    unSaveImage,
    getListImageSaved,
    getListImageCreated,
    deleteImage,
    getAllImageUserCreated} from '../controllers/imageController.js';

const imageRoute = express.Router();
//Lấy danh sách tất cả người dùng
imageRoute.get('/get-list-images', getAllImages);

//Tìm kiếm hình ảnh theo tên
imageRoute.get('/find-images/:keyword', findImages);

//Lấy thông tin ảnh và người tạo ảnh
imageRoute.get('/info-image-user/:image_id',khoaApi,getInfoImageUser)

//create image
imageRoute.put('/create-image',upload.single('file'),createImage);

//Kiểm tra ảnh đã save chưa
imageRoute.get('/check-save-image/:image_id',checkImageHasSave);

//Chức năng khi bấm vào nút save sẽ lưu lại hình ảnh, ( những hình ảnh nào đã được lưu sẽ hiển thị ra giao diện client)
imageRoute.put('/save-image',saveImage);

//Chức năng hủy save image
imageRoute.put('/unsave-image',unSaveImage);

//Lấy thông tin danh sách hình ảnh mà user đã tạo
imageRoute.get('/get-all-image-user-created/:user_id',getAllImageUserCreated);

//lấy danh sách ảnh đã lưu theo user_id
imageRoute.get('/get-list-image-saved/:user_id',getListImageSaved);

//lấy danh sách đã tạo theo user_id
imageRoute.get('/get-list-image-created/:user_id',getListImageCreated);

//Xóa ảnh đã tạo theo image_id
imageRoute.delete('/delete-image/:image_id',deleteImage);
export default imageRoute;