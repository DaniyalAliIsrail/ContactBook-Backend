import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const fileUploader = (e) => {
    // console.log(e);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(e, (error, data) => {
            if (data) {
                fs.unlinkSync(e);
                // console.log(data);
                const url = data.secure_url;
                // console.log(url);
                resolve(data);
            } else {
                console.error('Error uploading file to Cloudinary:', error);
                reject(error);
            }
        });
    });
};

export default fileUploader;




