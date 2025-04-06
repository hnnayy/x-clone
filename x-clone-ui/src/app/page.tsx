"use client";
import Image from "next/image";
import { IKImage } from "imagekitio-next";

const urlEndpoint = "https://ik.imagekit.io/r88gseoed"; // Hanya endpoint, tanpa gambar

export default function Home() {
  return (
    <div>
      HomePage
      <IKImage urlEndpoint={urlEndpoint} path="/general/default-image.jpg" />
      this image cannot open
    </div>
  );
}
