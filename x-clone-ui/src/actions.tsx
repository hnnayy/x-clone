// actions.ts or actions.js
"use server";

export const shareAction = async (formData: FormData) => {
  const file = formData.get("file") as File;
  const desc = formData.get("desc") as string;
  
  console.log(file, desc);
  
  // Here you would typically:
  // 1. Upload the file to storage
  // 2. Save the post data to database
  // 3. Return success/error response
};