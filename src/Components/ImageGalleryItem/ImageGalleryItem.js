import React from "react";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ id, webformatURL }) {
  return (
    <li className={s.ImageGalleryItem} key={id}>
      <img src={webformatURL} alt="" className={s.ImageGalleryItemImage} />
    </li>
  );
}
