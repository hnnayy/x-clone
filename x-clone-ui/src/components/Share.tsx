import React from "react";
import Image from "./Image";
import Link from "next/link";

function Share() {
  return (
    <div className="p-4 flex gap-4">
      {/* Avatar */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image
          path="/General/NewJeans.jpg"
          w={100}
          h={100}
          alt="post"
          className="rounded-full"
        />
      </div>
      {/* OTHERS */}
      <div className="flex-1 flex flex-col gap-4">
        <input type="text" placeholder="how is your day" />
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <Image
              path="/General/image.svg"
              w={20}
              h={20}
              alt="post"
              className="rounded-full"
            />
            <Image
              path="/General/gif.svg"
              w={20}
              h={20}
              alt="post"
              className="rounded-full"
            />
            <Image
              path="/General/poll.svg"
              w={20}
              h={20}
              alt="post"
              className="rounded-full"
            />
            <Image
              path="/General/emoji.svg"
              w={20}
              h={20}
              alt="post"
              className="rounded-full"
            />
            <Image
              path="/General/schedule.svg"
              w={20}
              h={20}
              alt="post"
              className="rounded-full"
            />
            <Image
              path="/General/location.svg"
              w={20}
              h={20}
              alt="post"
              className="rounded-full"
            />

            <div className="">
              {/* Post button */}
              <button className="bg-black text-white rounded-full font-bold py-2 px-4 hover:bg-gray-800 transition-colors duration-200">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;
