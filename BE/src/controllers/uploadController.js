//upload avatar
//yarn add multer
import multer, { diskStorage } from 'multer';
//goi dirname trả về đường dẫn nodejs
// __dirname => nodejs/src/routes 
const upload = multer({
    //định vi nơi lưu tam hinh, diskStorage khai báo nơi luu
    storage: diskStorage({
        destination:process.cwd() + "/public/img",// nơi lưu src img thư muc lưu trữ => dih dang là đường dẫn
        filename: (req,file,callBack) => {
            callBack(null,new Date().getTime() + "_" + file.originalname) // làm sao để k trùng ten meo.jpeg
        } // nơi đổi tên tài nguyên
    })
});

export default upload;