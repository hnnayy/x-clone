// actions.ts or actions.js
"use server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: "public_LrjJGcNOk+x6CSy0ip50/kSkT3U=",
  privateKey: "private_wBXKSa7MfSGkFZWss++iI/dDKWA=",
  urlEndpoint: "https://ik.imagekit.io/r88gseoed/"
});

export const shareAction = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File;
    const description = formData.get("desc") as string;
    const croppedImage = formData.get("croppedImage") as string;

    if (!file || file.size === 0) {
      console.log("Text-only post:", description);
      return { success: true, message: "Text post created successfully" };
    }

    let fileBuffer: Buffer;
    let fileName = file.name || "uploaded-file";

    // Check file type to determine if it's a video or image
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    // For images: use cropped image if provided
    if (isImage && croppedImage && croppedImage.startsWith("data:image")) {
      const base64Data = croppedImage.replace(/^data:image\/\w+;base64,/, "");
      fileBuffer = Buffer.from(base64Data, "base64");
    } else {
      const bytes = await file.arrayBuffer();
      fileBuffer = Buffer.from(bytes);
    }

    // Upload to ImageKit
    return new Promise((resolve, reject) => {
      imagekit.upload({
        file: fileBuffer,
        fileName,
        folder: "/posts",
        useUniqueFileName: true,
        // For videos, we skip the image transformation
        transformation: isImage
          ? [{ width: "600" }]  // Apply only for image
          : undefined,
      }, (error, result) => {
        if (error) {
          console.error("ImageKit upload error:", error);
          reject({ success: false, message: "Failed to upload file" });
        } else {
          console.log("Upload successful:", result);
          resolve({
            success: true,
            message: "Post created successfully",
            fileUrl: result.url,
            fileType: isVideo ? "video" : "image"
          });
        }
      });
    });
  } catch (error) {
    console.error("Error in shareAction:", error);
    return { success: false, message: "Error processing your post" };
  }
};
