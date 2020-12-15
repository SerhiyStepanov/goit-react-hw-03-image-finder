import React, { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Modal from "../Modal";
import Loaded from "../Loader";
import Button from "../Button";
import s from "./ImageGallery.module.css";

export default class ImageGallery extends Component {
  state = {
    search: null,
    error: null,
    status: "idle",
    page: 1,
    showModal: false,
    imageModal: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevSearh = prevProps.search;
    const currentSearch = this.props.search;

    if (prevSearh !== currentSearch) {
      this.setState({ status: "pending", page: 1 });

      this.apiFetch(currentSearch, page)
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

  apiFetch = (search, page) => {
    return fetch(
      `https://pixabay.com/api/?key=8315600-a916a243d8ea2edafddc43bfd&q=${search}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    );
  };

  handleChangePage = () => {
    const { page } = this.state;
    const currentSearch = this.props.search;
    const nextPage = page + 1;

    this.setState(({ page }) => ({
      page: page + 1,
    }));

    this.apiFetch(currentSearch, nextPage)
      .then((response) => {
        return response.json();
      })
      .then((data) =>
        this.setState(({ search }) => ({
          search: [...search, ...data.hits],
        }))
      );
  };

  openModal = (largeImageURL) => {
    this.setState({
      showModal: true,
      imageModal: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { search, error, status, showModal, imageModal } = this.state;

    if (status === "idle") {
      return <h2 style={{ textAlign: "center" }}>Введите параметы поиска </h2>;
    }

    if (status === "pending") {
      return <Loaded />;
    }

    if (status === "rejected") {
      return <h2>{error}</h2>;
    }

    if (status === "resolved") {
      return (
        <>
          <ul className={s.ImageGallery}>
            {search.map((el, index) => (
              <ImageGalleryItem
                key={el.id}
                webformatURL={el.webformatURL}
                largeImageURL={el.largeImageURL}
                clickOnImageItem={this.openModal}
              />
            ))}
          </ul>

          {showModal && (
            <Modal onCloseModal={this.closeModal}>
              {<img src={imageModal} alt="" />}
            </Modal>
          )}

          <Button btnLoad={this.handleChangePage} />
        </>
      );
    }
  }
}
