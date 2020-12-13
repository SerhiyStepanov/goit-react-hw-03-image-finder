import React, { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./ImageGallery.module.css";

export default class ImageGallery extends Component {
  state = {
    search: null,
    error: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearh = prevProps.search;
    const currentSearch = this.props.search;
    if (prevSearh !== currentSearch) {
      this.setState({ status: "pending" });
      fetch(
        `https://pixabay.com/api/?key=8315600-a916a243d8ea2edafddc43bfd&q=${currentSearch}&image_type=photo&orientation=horizontal&page=1&per_page=12`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(`По запросу ${currentSearch}ничего не найдено`)
          );
        })
        .then((data) =>
          this.setState({ search: data.hits, status: "resolved" })
        )
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  render() {
    const { search, error, status } = this.state;

    if (status === "idle") {
      return <h2>stend</h2>;
    }

    if (status === "pending") {
      return (
        <Loader
          style={{ textAlign: "center" }}
          type="ThreeDots"
          color="#3f51b5"
          height={80}
          width={80}
        />
      );
    }

    if (status === "rejected") {
      return <h2>{error.message}</h2>;
    }

    if (status === "resolved") {
      return (
        <ul className={s.ImageGallery}>
          {search &&
            search.map((el) => (
              <ImageGalleryItem key={el.id} webformatURL={el.webformatURL} />
            ))}
        </ul>
      );
    }
  }
}
