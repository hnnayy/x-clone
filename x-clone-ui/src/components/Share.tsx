"use client";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "./Image";
import { shareAction } from "@/actions";

const ShareForm = () => {
  const [media, setMedia] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // For simple cropping functionality
  const [cropStart, setCropStart] = useState({ x: 0, y: 0 });
  const [cropEnd, setCropEnd] = useState({ x: 0, y: 0 });
  const [isCropping, setIsCropping] = useState(false);
  const imageRef = useRef(null);

  const handleMediaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleMouseDown = (e) => {
    if (!isEditing) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCropStart({ x, y });
    setCropEnd({ x, y });
    setIsCropping(true);
  };

  const handleMouseMove = (e) => {
    if (!isEditing || !isCropping) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    const y = Math.min(Math.max(0, e.clientY - rect.top), rect.height);
    
    setCropEnd({ x, y });
  };

  const handleMouseUp = () => {
    if (!isEditing) return;
    setIsCropping(false);
    
    if (Math.abs(cropStart.x - cropEnd.x) < 10 || Math.abs(cropStart.y - cropEnd.y) < 10) {
      // Ignore very small crop selections
      return;
    }
    
    applyCrop();
  };

  const applyCrop = () => {
    if (!imageRef.current) return;
    
    const image = imageRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Calculate crop coordinates
    const startX = Math.min(cropStart.x, cropEnd.x);
    const startY = Math.min(cropStart.y, cropEnd.y);
    const width = Math.abs(cropEnd.x - cropStart.x);
    const height = Math.abs(cropEnd.y - cropStart.y);
    
    // Set canvas dimensions to the cropped size
    canvas.width = width;
    canvas.height = height;
    
    // Draw only the cropped portion to the canvas
    ctx.drawImage(
      image,
      startX, startY, width, height,
      0, 0, width, height
    );
    
    // Convert to data URL and update preview
    const newPreviewUrl = canvas.toDataURL('image/jpeg');
    setPreviewUrl(newPreviewUrl);
    
    // Convert data URL to File object for upload
    canvas.toBlob((blob) => {
      const croppedFile = new File([blob], media.name, { type: 'image/jpeg' });
      setMedia(croppedFile);
    }, 'image/jpeg');
    
    // Exit edit mode
    setIsEditing(false);
  };

  const cancelCrop = () => {
    setIsEditing(false);
    setCropStart({ x: 0, y: 0 });
    setCropEnd({ x: 0, y: 0 });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setCropStart({ x: 0, y: 0 });
      setCropEnd({ x: 0, y: 0 });
    }
  };

  return (
    <form className="p-4 flex gap-4 border-b border-[#6abf87]" action={shareAction}>
      {/* Avatar */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image
          path="/General/NewJeans.jpg"
          w={100}
          h={100}
          alt="profile avatar"
          className="rounded-full"
        />
      </div> 
      {/* OTHERS */}
      <div className="flex-1 flex flex-col gap-4">
        <input 
          type="text" 
          name="desc" 
          placeholder="how is your day?" 
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-[#6abf87]"
        />
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            {/* Image upload */}
            <input
              type="file"
              name="file"
              onChange={handleMediaChange}
              className="hidden"
              id="file"
              accept="image/*"
            />
            <label htmlFor="file" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2a623d"
                  d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"
                />
              </svg>
            </label>

            {/* GIF button */}
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2a623d"
                  d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"
                />
              </svg>
            </div>

            {/* Poll button */}
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2a623d"
                  d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"
                />
              </svg>
            </div>

            {/* Emoji button */}
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2a623d"
                  d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"
                />
              </svg>
            </div>

            {/* Schedule button */}
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2a623d"
                  d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"
                />
              </svg>
            </div>

            {/* Location button */}
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2a623d"
                  d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"
                />
              </svg>
            </div>
          </div>
          {/* Post button */}
          <button 
            type="submit" 
            className="bg-[#2a623d] hover:bg-[#1f4a2d] text-white rounded-full font-bold py-2 px-6 transition-colors"
          >
            Post
          </button>
        </div>
        
        {/* Preview uploaded media if available */}
        {media && (
          <div className="mt-2 relative">
            <div 
              className={`relative rounded-lg overflow-hidden max-h-80 ${isEditing ? 'cursor-crosshair' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => isCropping && setIsCropping(false)}
            >
              <img 
                ref={imageRef}
                src={previewUrl} 
                alt="Upload preview" 
                className="w-full object-contain"
              />
              
              {/* Crop overlay */}
              {isEditing && isCropping && (
                <div 
                  className="absolute border-2 border-white"
                  style={{
                    left: Math.min(cropStart.x, cropEnd.x) + 'px',
                    top: Math.min(cropStart.y, cropEnd.y) + 'px',
                    width: Math.abs(cropEnd.x - cropStart.x) + 'px',
                    height: Math.abs(cropEnd.y - cropStart.y) + 'px',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)'
                  }}
                ></div>
              )}
              
              {/* Edit/Remove buttons */}
              <div className="absolute top-2 right-2 flex gap-2">
                {!isEditing ? (
                  <>
                    {/* Edit button */}
                    <div 
                      onClick={toggleEditMode}
                      className="bg-black bg-opacity-50 text-white rounded-full p-1 cursor-pointer"
                      aria-label="Edit image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path 
                          fill="currentColor" 
                          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                        />
                      </svg>
                    </div>
                    {/* Remove button */}
                    <div 
                      onClick={() => setMedia(null)}
                      className="bg-black bg-opacity-50 text-white rounded-full p-1 cursor-pointer"
                      aria-label="Remove image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path 
                          fill="currentColor" 
                          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        />
                      </svg>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Apply crop button */}
                    <div 
                      onClick={applyCrop}
                      className="bg-black bg-opacity-50 text-white rounded-full p-1 cursor-pointer"
                      aria-label="Apply crop"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path 
                          fill="currentColor" 
                          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                        />
                      </svg>
                    </div>
                    {/* Cancel crop button */}
                    <div 
                      onClick={cancelCrop}
                      className="bg-black bg-opacity-50 text-white rounded-full p-1 cursor-pointer"
                      aria-label="Cancel crop"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path 
                          fill="currentColor" 
                          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        />
                      </svg>
                    </div>
                  </>
                )}
              </div>
              
              {/* Editing instructions */}
              {isEditing && (
                <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-sm p-2 rounded">
                  Click and drag to select the area to crop
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Hidden input to store the cropped image data for form submission */}
        {media && (
          <input 
            type="hidden" 
            name="croppedImage" 
            value={previewUrl} 
          />
        )}
      </div>
    </form>
  );
};

// Main component with SSR disabled
const Share = () => {
  return <ShareForm />;
};

// Use dynamic import to disable SSR for this component
export default dynamic(() => Promise.resolve(Share), { ssr: false });