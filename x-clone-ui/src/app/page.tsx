"use client";

import Share from "../components/Share";
import Feed from "../components/Feed";
import Link from "next/link";

const tabs = [
  { label: "For you", href: "/", isActive: true },
  { label: "Following", href: "/" },
  { label: "Komunitas Marah-Marah", href: "/" },
  { label: "NextJs", href: "/" },
];

export default function Home() {
  return (
    <div>
      <div className="flex h-12 border-b border-[#a0a0a0] text-[#2a623d] font-bold">
        <Link
          href="/"
          className="flex-1 flex justify-center items-center hover:bg-[#FFE2E2] h-full border-b-4 border-iconBlue"
        >
          For you
        </Link>
        <Link
          href="/"
          className="flex-1 flex justify-center items-center hover:bg-[#FFE2E2] h-full"
        >
          Following
        </Link>
        <Link
          href="/"
          className="flex-1 flex justify-center items-center hover:bg-[#FFE2E2] h-full"
        >
          Java
        </Link>
        <Link
          href="/"
          className="flex-1 flex justify-center items-center hover:bg-[#FFE2E2] h-full"
        >
          NextJs
        </Link>
      </div>

      <Share />
      <Feed />
    </div>
  );
}
