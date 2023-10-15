import { createToken, decodeToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

import bcrypt from "bcrypt";
let model = initModels(sequelize);

const getAllUsers = async (req, res) => {
    let data = await model.users.findAll();

    res.send(data);
}

const getInfoUser = async (req, res) => {
    let {user_id} = req.params;
    let data = await model.users.findByPk(user_id);

    let newData = {
        ...data.dataValues,
        pass_word: ''
    }
    res.status(200).send(newData);
}

const userSignUp = async (req, res) => {
    let { full_name, email, pass_word } = req.body;

    //Kiểm tra email
    let checkEmail = await model.users.findOne({
        where: {
            email: email
        }
    })

    if (checkEmail) {
        res.send('Email đã tồn tại!');
        return;
    };

    let passCrypt = bcrypt.hashSync(pass_word, 10);

    let newData = {
        full_name,
        email,
        pass_word: passCrypt,
    };
    //insert into value
    await model.users.create(newData);

    res.status(200).send('Đăng ký thành công!');
}

const userLogin = async (req, res) => {
    let { email, pass_word } = req.body;

    let checkEmail = await model.users.findOne({
        where: {
            email: email,
        }
    })

    if (checkEmail) {
        let checkPass = bcrypt.compareSync(pass_word, checkEmail.pass_word);
        if (checkPass) {
            let token = createToken({ checkEmail, pass_word: "" });
            let newUserHasToken = {...checkEmail,token: token,statusCode:200}
            res.status(200).send(newUserHasToken);
        } else {
            res.status(404).send('Mật khẩu không đúng!');
        }

    } else {
        res.status(404).send('Email không đúng!');
    }
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNoZWNrRW1haWwiOnsidXNlcl9pZCI6NiwiZnVsbF9uYW1lIjoiYmFvQGdtYWlsLmNvbSIsImVtYWlsIjoiYmFvQGdtYWlsLmNvbSIsInBhc3Nfd29yZCI6IiQyYiQxMCQ3TGRaQW5IeDF0QnlTTUdQVmhJeHV1VzdEWEFOTjRNN29adllyNmpSVDRST1JWTXZYUE5OYSJ9LCJwYXNzX3dvcmQiOiIifSwiaWF0IjoxNjk2Njg1OTU0LCJleHAiOjE4NTQ0NzM5NTR9.xmLaNK1tPOTYgTt1HfQ5dkgwGV3IG9z28egFpo_OEcs

export {userSignUp,userLogin,getAllUsers,getInfoUser};