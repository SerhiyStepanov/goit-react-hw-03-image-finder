import React from "react";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem(props) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={props.webformatURL}
        alt=""
        className={s.ImageGalleryItem - image}
      />
    </li>
  );
}
