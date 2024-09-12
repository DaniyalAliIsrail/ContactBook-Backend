// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// const fileUploader = async (filePath) => {
//     try {
//         const data = await cloudinary.uploader.upload(filePath);
//         // Delete the file after successful upload
//         fs.unlinkSync(filePath);
//         return data;
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         throw error; // Re-throw the error for handling in the caller function
//     }
// };
// export default fileUploader;


// import { v2 as cloudinary } from 'cloudinary';

// const fileUploader = async (fileBuffer) => {
//     try {
//         // Upload directly using the buffer
//         const data = await cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
//           if (error) {
//             throw error;
//           }
//           return result;
//         }).end(fileBuffer);

//         return data; // Return the data from Cloudinary
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         throw error; // Re-throw the error for handling in the caller function
//     }
// };

// export default fileUploader;


import { v2 as cloudinary } from 'cloudinary';
   
const fileUploader = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) {
        reject(error);  // Reject the promise if there's an error
      } else {
        resolve(result); // Resolve the promise with the result (uploaded image details)
      }
    });
    uploadStream.end(fileBuffer); // Pass the buffer to the upload stream
  });
};

export default fileUploader;