import jwt from "jsonwebtoken";

//mã hóa token
const createToken = (data) => {
    //HS256
    // khi có thời hạn sử dụng thì data phải bỏ trong {data}còn kg có thời hạn thì data k cần để {data}
    let token = jwt.sign({data},"NODE35",{algorithm: "HS256", expiresIn:"5y"})
    //expiresIn : 5000 = 5p, 5m = 5 phút , 5y =  5 năm
    return token;
}
// kiem tra hop le
const checkToken = (token) => {
    return jwt.verify(token, "NODE35");
}
// giải mã token
const decodeToken = (token) => {
    return jwt.decode(token);
    // trả về object tạo ban đầu {data}
}

const khoaApi = (req, res, next) => {
    try {
        let { token } = req.headers;

        checkToken(token);
        next();
    }
    catch (exception) {
        res.status(404).send('Không có quyền truy cập!');
    }
}

export {
    createToken,
    checkToken,
    decodeToken,
    khoaApi
}