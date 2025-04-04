import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { link } from 'fs'

const menuList = [
    {
        id: 1,
        name: "Homepage",
        link: "/",
        icon: "home.png",
    },
    {
        id : 2, 
        name: "Explore",
        link: "/",
        icon: "explore.png",
    },
    {
        id: 3,
        name: "Notification",
        link: "/",
        icon: "notification.png",
    },
    {
        id: 4,
        name: "Messege",
        link: "/",
        icon: "messege.png",
    },
    {
        id: 5,
        name: "Bookmark",
        link: "/",
        icon: "bookmark.png",
    },
    {
        id: 6,
        name: "Jobs",
        link: "/",
        icon: "jobs.png",
    },
    {
        id: 7,
        name: "Communities",
        link: "/",
        icon: "communities.png",
    },
    {
        id: 8,
        name: "Premium",
        link: "/",
        icon: "premium.png",

    },
    {
        id: 9,
        name: "Profile",
        link: "/",
        icon: "profile.png",
    },
    {
        id: 10,
        name: "More",
        link: "/",
        icon: "more.png",
    },
]
function LeftBar() {
  return (
      <div className="h-screen sticky top-0 flex flex-col  pt-2 pb-8 items-center">
        {/*logo menu button*/}
        <div className="flex flex-col gap-2 text-lg items-center">
            {/* logo */}
            <Link href="/" className='p-2 rounded-full hover:bg-gray-200 w-full max-w-[400px]'>
            <Image src="/icons/logo.png" alt="logo" width={100} height={100} />
            </Link>
        </div>
        {/* menu list */}
        <div className="flex flex-col">
            {menuList.map((item) => (
                <Link href={item.link} className='p-2 rounded-full hover:bg-gray-200 flex items-center gap-4' 
                key={item.id}>
                        <Image
                            src={`/icons/${item.icon}`}
                            alt={item.name}
                            width={24}
                            height={24}
                        />
                        <span className='hidden md:inline'>{item.name}</span>
                </Link>
            ))}
            
        </div>
        <div className="flex items-center gap-2">
            {/* Button Icon (Muncul hanya di xsm & sm) */}
            <Link href="/" className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-200 block md:hidden">
                <Image src="/icons/post.png" alt="New Post" width={24} height={24} />
            </Link>

            {/* Button Text (Muncul di layar lg ke atas) */}
            <Link href="/" className="hidden md:flex bg-black text-white rounded-full font-bold py-2 px-14 hover:bg-gray-800 transition mt-6">
                Post
            </Link>
        </div>

       {/* Bagian User */}
        <div className="flex items-center gap-2 px-3 py-2 mt-auto rounded-full hover:bg-gray-200 w-full max-w-[400px]">
            <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image src="/profil-picture.jpg" alt="user" fill className="object-cover" />
            </div>
            <div className="hidden sm:block">
                <span className="font-bold">ambis_na</span>
                <br />
                <span className="text-sm text-gray-500">@hnnayy</span>
            </div>
        </div>

      </div>
  )
}

export default LeftBar
