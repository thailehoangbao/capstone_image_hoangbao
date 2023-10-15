import sequelize from "../models/connect.js";
import Sequelize from 'sequelize';
import initModels from "../models/init-models.js";
import { decodeToken } from "../config/jwt.js";
let model = initModels(sequelize);

const postComment = async (req, res) => {
    let { image_id } = req.params;
    let { content } = req.body;
    let { token } = req.headers;
    let userInfo = decodeToken(token);
    let {user_id} = userInfo.data.checkEmail;

    // console.log(content)
    let newData = {
        user_id,
        image_id,
        content,
        date_create: new Date()
    }

    await model.images_comment.create(newData);
    res.status(200).send('Success!');
}

const getAllCommentsImage = async (req, res) => {
    let { image_id } = req.params;

    let data = await model.images_comment.findAll({
        where: {
            image_id
        },
        include: ['user']
    })
    res.status(200).send(data);
}

const deleteComment = async (req, res) => {
    let {comment_id} = req.params;
    console.log(comment_id);
    await model.images_comment.destroy({
        where: {
            comment_id
        }
    })
    res.status(200).send('Delete success!');
}

export { postComment ,getAllCommentsImage,deleteComment};