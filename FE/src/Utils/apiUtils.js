import axios from 'axios';
import { TOKEN, USER_LOGIN } from './constantsUtils';

export const BASE_URL = 'http://localhost:8082';

const options = {
    params: {
        maxResults: 50,
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
        'token': JSON.parse(localStorage.getItem(TOKEN))
    },
};

export const getAllImages = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/image/get-list-images`);
    return data;
}

export const findImageFollowName = async (keyword) => {
    const { data } = await axios.get(`${BASE_URL}/api/image/find-images/${keyword}`);
    return data;
}


export const signup = async (formData) => {
    const { data } = await axios.post(`${BASE_URL}/api/user/sign-up`,formData);
    return data;
}

export const login = async (formData) => {
    const { data } = await axios.post(`${BASE_URL}/api/user/login`,formData);
    return data;
}

export const getInfoImageUser = async (image_id) => {
    const { data } = await axios.get(`${BASE_URL}/api/image/info-image-user/${image_id}`,options);
    return data;
}

export const getAllCommentsImage = async (image_id) => {
    const { data } = await axios.get(`${BASE_URL}/api/comment/get-all-comments-image/${image_id}`,options);
    return data;
}

export const postComment = async (image_id,content) => {
    const { data } = await axios.post(`${BASE_URL}/api/comment/post-comments/${image_id}`,content,options);
    return data;
}

export const deleteComment = async (comment_id) => {
    const { data } = await axios.delete(`${BASE_URL}/api/comment/delete-comment/${comment_id}`,options);
    return data;
}

export const checkSaveImage = async (image_id) => {
    const { data } = await axios.get(`${BASE_URL}/api/image/check-save-image/${image_id}`,options);
    return data;
}

export const createImage = async (formData) => {
    const { data } = await axios.put(`${BASE_URL}/api/image/create-image`,formData,options);
    return data;
}

export const deleteImage = async (image_id) => {
    const { data } = await axios.delete(`${BASE_URL}/api/image/delete-image/${image_id}`,options);
    return data;
}

export const saveImage = async (image_id) => {
    const { data } = await axios.put(`${BASE_URL}/api/image/save-image`,image_id,options);
    return data;
}

export const unSaveImage = async (image_id) => {
    const { data } = await axios.put(`${BASE_URL}/api/image/unsave-image`,image_id,options);
    return data;
}

export const getAllImagesCreatedByUser = async (user_id) => {
    const { data } = await axios.get(`${BASE_URL}/api/image/get-all-image-user-created/${user_id}`,options);
    return data;
}