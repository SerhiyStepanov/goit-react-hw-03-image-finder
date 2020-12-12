import React, { Component } from "react";
// import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

export default class ImageGallery extends Component {
  state = {
    search: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevSearh = prevProps.search;
    const currentSearch = this.props.search;
    if (prevSearh !== currentSearch) {
      fetch(
        `https://pixabay.com/api/?key=8315600-a916a243d8ea2edafddc43bfd&q=${currentSearch}&image_type=photo&orientation=horizontal&page=1&per_page=12`
      )
        .then((res) => res.json())
        .then((data) => this.setState({ search: data.hits }));
    }
  }
  render() {
    return (
      <ul className={s.ImageGallery}>
        {this.state.search &&
          this.state.search.map((el) => (
            <li className="ImageGalleryItem">
              <img
                src={el.webformatURL}
                alt=""
                className="ImageGalleryItem-image"
              />
            </li>
          ))}
      </ul>
    );
  }
}
