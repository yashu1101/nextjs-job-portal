import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (dest, file) => {
    try {
        // File → ArrayBuffer → Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Buffer → Base64 Data URI
        const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

        // Normal await — no new Promise()
        const uploadResult = await cloudinary.uploader.upload(dataUri, {
            resource_type: "auto",
            folder: dest,
        });

        return {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        };

    } catch (error) {
        console.log("Cloudinary error:", error);
        return null;
    }
};


// DELETE FROM CLOUDINARY 

export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.log("Cloudinary delete error:", error);
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };