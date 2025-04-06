import React from "react";
import Image from "./Image";
import PostInfo from "./PostInfo";
import PostInteraction from "./PostInteraction";

const Post = () => {
  return (
    <div className="p-4 border-b border-[#6abf87] text-black">
      {/* Repost Info */}
      <div className="text-xs text-[#2a623d] mb-2"></div>

      {/* Post Content */}
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            path="/General/NewJeans.jpg"
            w={100}
            h={100}
            alt="post"
            className="rounded-full"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1">
          {/* Top Bar: Username + Time + PostInfo */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap text-sm">
              <h1 className="font-bold">HANIN AYU</h1>
              <span className="text-[#2a623d]">@haninayy</span>
              <span className="text-gray-500">1 day ago</span>
            </div>
            <PostInfo />
          </div>

          {/* Text Content */}
          <p className="mt-2 text-sm leading-relaxed">
            Platform khusus pembela newjeans <br />
            Hidup wanita yang melawan
            tp minimal comeback dulu si jangan tiba-tiba hiatus bjirr
          </p>

          {/* Image Content */}
          <Image
            path="/General/NewJeans.jpg"
            w={500}
            h={300}
            alt="post"
            className="rounded-lg mt-3"
          />
            
            {/* Post Actions */}
            <div className="">
              <PostInteraction />
            </div>
        </div>



      </div>
    </div>
  );
};

export default Post;
