// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// const fileUploader = async (e) => {
//     let Data;
//     // return e
//     await cloudinary.uploader.upload(e, async (error, data) => {
//         if (data) {
//             fs.unlinkSync(e);
//             console.log(data)
//             const url = await data.secure_url
//             console.log(url);
//             Data = data
//         }
//       });
//      return Data
// };

// export default fileUploader;


// fileUploader.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const fileUploader = async (filePath) => {
    try {
        const data = await cloudinary.uploader.upload(filePath);
        // Delete the file after successful upload
        fs.unlinkSync(filePath);
        return data;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error; // Re-throw the error for handling in the caller function
    }
};

export default fileUploader;
