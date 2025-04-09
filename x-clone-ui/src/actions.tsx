// actions.ts or actions.js
"use server";
import ImageKit from "imagekit";

// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
  publicKey: "public_LrjJGcNOk+x6CSy0ip50/kSkT3U=",
  privateKey: "private_wBXKSa7MfSGkFZWss++iI/dDKWA=",
  urlEndpoint: "https://ik.imagekit.io/r88gseoed/"
});

export const shareAction = async (formData: FormData) => {
  try {
    // Get form data
    const file = formData.get("file") as File;
    const description = formData.get("desc") as string;
    const croppedImage = formData.get("croppedImage") as string;
    
    // Check if we have a file to upload
    if (!file || file.size === 0) {
      console.log("Text-only post:", description);
      // Here you would handle saving a text-only post to your database
      return { success: true, message: "Text post created successfully" };
    }
    
    let imageBuffer;
    
    // If we have a cropped image, process that instead of the original file
    if (croppedImage && croppedImage.startsWith('data:image')) {
      // Convert data URL to buffer
      const base64Data = croppedImage.replace(/^data:image\/\w+;base64,/, '');
      imageBuffer = Buffer.from(base64Data, 'base64');
    } else {
      // Use the original file
      const bytes = await file.arrayBuffer();
      imageBuffer = Buffer.from(bytes);
    }
    
    // Upload to ImageKit
    return new Promise((resolve, reject) => {
      imagekit.upload({
        file: imageBuffer,
        fileName: file.name || 'post-image.jpg',
        folder: "/posts",
        transformation: {
          pre: "w-600"
        }
      }, (error, result) => {
        if (error) {
          console.error("ImageKit upload error:", error);
          reject({ success: false, message: "Failed to upload image" });
        } else {
          console.log("Upload successful:", result);
          
          // Here you would typically:
          // 1. Save post data to your database (description, image URL)
          // 2. Associate it with the current user
          // 3. Handle any other metadata
          
          resolve({ 
            success: true, 
            message: "Post created successfully",
            imageUrl: result.url
          });
        }
      });
    });
  } catch (error) {
    console.error("Error in shareAction:", error);
    return { success: false, message: "Error processing your post" };
  }
};