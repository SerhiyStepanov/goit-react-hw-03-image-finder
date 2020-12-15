import React from "react";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  clickOnImageItem,
}) {
  return (
    <li className={s.ImageGalleryItem}>
      <div onClick={() => clickOnImageItem(largeImageURL)}>
        <img
          src={webformatURL}
          url={largeImageURL}
          alt=""
          className={s.ImageGalleryItemImage}
        />
      </div>
    </li>
  );
}
