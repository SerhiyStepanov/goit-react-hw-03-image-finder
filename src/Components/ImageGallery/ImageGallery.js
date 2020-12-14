import React, { Component } from "react";
// import Button from "../Button/Button";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loaded from "../Loader";
import Button from "../Button";
import s from "./ImageGallery.module.css";

export default class ImageGallery extends Component {
  state = {
    search: null,
    error: null,
    status: "idle",
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevSearh = prevProps.search;
    const currentSearch = this.props.search;

    if (prevSearh !== currentSearch) {
      this.setState({ status: "pending", page: 1 });
      fetch(
        `https://pixabay.com/api/?key=8315600-a916a243d8ea2edafddc43bfd&q=${currentSearch}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
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
          this.setState({
            search: data.hits,
            status: "resolved",
          })
        )
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  handleChangePage = () => {
    const { page } = this.state;
    const currentSearch = this.props.search;
    const nextPage = page + 1;

    this.setState(({ page }) => ({
      page: page + 1,
    }));
    fetch(
      `https://pixabay.com/api/?key=8315600-a916a243d8ea2edafddc43bfd&q=${currentSearch}&image_type=photo&orientation=horizontal&page=${nextPage}&per_page=12`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) =>
        this.setState(({ search }) => ({
          search: [...search, ...data.hits],
        }))
      );
  };

  render() {
    const { search, error, status } = this.state;

    if (status === "idle") {
      return <h2 style={{ textAlign: "center" }}>Введите параметы поиска</h2>;
    }

    if (status === "pending") {
      return <Loaded />;
    }

    if (status === "rejected") {
      return <h2>{error}</h2>;
    }

    if (status === "resolved") {
      return (
        <ul className={s.ImageGallery}>
          {search.map((el) => (
            <ImageGalleryItem key={el.id} webformatURL={el.webformatURL} />
          ))}
          <Button btnLoad={this.handleChangePage} />
        </ul>
      );
    }
  }
}
