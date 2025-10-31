"use client";
import GlobalServiceFactory from "@/app/serviceFactory/globalServiceFactory";
import { useState } from "react";

interface PropType {
  imageID: string;
  altText: string;
}

export default function ContentfulImage({ imageID, altText }: PropType) {
  const [imageSrc, setImageSrc] = useState(getImage());

  function getImage(): string {
    let imageUrl = "";
    GlobalServiceFactory.getImage(imageID)
      .then((entry) => {
        setImageSrc(entry.data.fields.file.url);
      })
      .catch(() => {
        setImageSrc("");
      });

    return imageUrl;
  }
  return <>{imageSrc !== "" && <img src={imageSrc} alt={altText} />}</>;
}