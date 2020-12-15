import React from "react";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ id, URL, clickOnImageItem }) {
  return (
    <li className={s.ImageGalleryItem} key={id}>
      <div onClick={clickOnImageItem}>
        <img src={URL} alt="" className={s.ImageGalleryItemImage} />
      </div>
    </li>
  );
}
