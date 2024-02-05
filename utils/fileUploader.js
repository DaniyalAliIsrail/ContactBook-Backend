import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const fileUploader = (e) => {
    // console.log(e);
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(e, (error, data) => {
            if (data) {
                fs.unlinkSync(e);
                console.log(data);
                const url = data.secure_url;
                console.log(url);
                resolve(data);
            } else {
                console.error('Error uploading file to Cloudinary:', error);
                reject(error);
            }
        });
    });
};

export default fileUploader;




















// 2

// const fileUploader = async (e)=>{
//     console.log(e)
//     let Data;
//     // return e
//     await cloudinary.uploader.upload(e, async (error, data) => {
//         if (data) {
//             fs.unlinkSync(e);
//             console.log(data)
//             const url = await data.secure_url
//             Data = data
//         }
     
//       });
//      return Data
// }
// export default fileUploader;


// 3

// import util from 'util';
// import cloudinary from 'cloudinary'; // Import cloudinary
// import fs from 'fs'; // Import fs module

// const cloudinaryUpload = util.promisify(cloudinary.uploader.upload);

// const fileUploader = async (e) => {
//     console.log(e);

//     try {
//         const data = await cloudinaryUpload(e);
//         fs.unlinkSync(e);
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.error(error);
//         throw error; // Re-throw the error for handling in the calling code if necessary
//     }
// };
// export default fileUploader;