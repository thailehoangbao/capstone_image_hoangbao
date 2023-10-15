import React, { useState } from 'react'
import { createImage } from '../../../Utils/apiUtils';
import { USER_LOGIN } from '../../../Utils/constantsUtils';
import { useNavigate } from 'react-router-dom';

export default function CreateImage() {
    const [img, setImg] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem(USER_LOGIN));
    
    if(!user) {
        return navigate('/login');
    }
    
    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/jpeg') {
            // tạo đối tượng đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);// đọc file 
            reader.onload = (e) => {
                // console.log(e.target.result);// trả ra link
                setImg(e.target.result);
            }
        }
    }

    return (
        <div className='p-20 grid grid-cols-2'>
            <div className='col-span-1'>
                <img className='round-md' src={img} alt="img" id="selectImg" style={{ width: "200px", height: "200px" }} />
                <input className="form-control" type="file" id="formFile" onChange={handleChangeFile} />
                <br />
                <input type="text" id="desc" placeholder='Điền Mô Tả Ảnh'  className='rounded-md mt-2 p-2' style={{border:"1px solid #888",width:"300px"}}/>
                <br />
                <input type="text" id="imageName" placeholder='Điền tên ảnh'  className='rounded-md mt-2 p-2' style={{border:"1px solid #888",width:"300px"}}/>
                <br />
                <button className='mt-2' style={{ width: "120px", height: "40px", borderRadius: "4px", backgroundColor: "blue", color: "white" }} onClick={() => {
                    const file = document.querySelector("#formFile").files[0];
                    const image_name = document.querySelector("#imageName").value;
                    const  description = document.querySelector("#desc").value;
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("description", description);
                    formData.append("image_name", image_name);
                    createImage(formData)
                        .then(rs => {
                            alert(rs);
                        })
                        .catch(err => { console.log(err) })
                }}>Create Image</button>
            </div>
            <div className='col-span-1'>

            </div>

        </div>
    )
}
