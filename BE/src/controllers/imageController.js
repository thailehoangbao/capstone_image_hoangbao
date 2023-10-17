import sequelize from "../models/connect.js";
import Sequelize from 'sequelize';
import initModels from "../models/init-models.js";
import {decodeToken} from '../config/jwt.js';
let model = initModels(sequelize);

//Lấy danh sách tất cả người dùng
const getAllImages = async (req, res) => {
    let data = await model.images.findAll();

    res.status(200).send(data);
}

//Lấy danh sách theo tên
const findImages = async (req, res) => {
    let { keyword } = req.params;
    let data = await model.images.findAll({
        where: {
            image_name: {
                [Sequelize.Op.like]: `%${keyword}%`
            }
        }
    })
    res.status(200).send(data);
}


const getInfoImageUser = async (req, res) => {
    let { image_id } = req.params;
    let data = await model.images.findOne({
        where: {
            image_id
        },
        include: ['user']
    })
    res.status(200).send(data);
}

//Tạo mới hình ảnh
const createImage = async (req, res) => {
    let file = req.file;
    let {image_name,description} = req.body;
    let { token } = req.headers;
    let userInfo = decodeToken(token);
    let {user_id} = userInfo.data.checkEmail;
    let newImage = {
        image_name,
        image: file.filename,
        description,
        is_save : null,
        user_id
    };
    await model.images.create(newImage);
    res.status(201).send('Create Success!');
};

//Kiểm tra trạng thái hình ảnh đã save chưa?
const checkImageHasSave = async (req,res) => {
    let {image_id} = req.params;
    let data = await model.images.findByPk(image_id);
    if (data.dataValues.is_save) {
        res.status(201).send('Image have Saved!');
    }
    res.status(200).send('Image not saved!');
};

//Chức năng save image
const saveImage = async (req, res) => {
    let {image_id} = req.body;
    let data = await model.images.findByPk(image_id);
    if (!data.dataValues.is_save) {
        let newData = {...data.dataValues, is_save: true};
        await model.images.update(newData,{
            where: {
                image_id
            }
        })
        res.status(201).send(true);
    } else {
        res.status(201).send(false);
    }
}

//Chức năng hủy save
const unSaveImage = async (req, res) => {
    let {image_id} = req.body;
    let data = await model.images.findByPk(image_id);
    if (data.dataValues.is_save) {
        let newData = {...data.dataValues, is_save: false};
        await model.images.update(newData,{
            where: {
                image_id
            }
        })
        res.status(200).send(false);
    } else{
        res.status(200).send(true);
    }
}

const getListImageSaved = async (req, res) => {
    let {user_id} = req.params;
    let data = await model.images.findAll({
        where: {
            user_id,
            is_save: true
        }
    })
    
    res.status(200).send(data);
}

const getListImageCreated = async (req, res) => {
    let {user_id} = req.params;
    let data = await model.images.findAll({
        where: {
            user_id
        }
    })

    res.status(200).send(data);
}

const deleteImage = async (req, res) => {
    let {image_id} = req.params;
    await model.images_comment.destroy({
        where: {
            image_id
        }
    })
    await model.images.destroy({
        where: {
            image_id
        }
    })
    res.status(200).send('Deleted!')
}

const getAllImageUserCreated = async (req, res) => {
    let {user_id} = req.params;
    let data = await model.images.findAll({
        where: {
            user_id
        }
    })
    res.status(200).send(data);
}

export { getAllImages, findImages, getInfoImageUser,createImage,checkImageHasSave
    ,saveImage,unSaveImage,getListImageSaved,getListImageCreated,deleteImage,getAllImageUserCreated};


