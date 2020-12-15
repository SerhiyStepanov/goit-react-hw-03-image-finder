import React, { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loaded from "../Loader";
import Button from "../Button";
import s from "./ImageGallery.module.css";
import Modal from "../Modal";

export default class ImageGallery extends Component {
  state = {
    search: null,
    error: null,
    status: "idle",
    page: 1,
    showModal: false,
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

  openModal = () => {
    this.setState({
      showModal: true,
    });
  };

  render() {
    const { search, error, status, showModal } = this.state;

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
        <>
          <ul className={s.ImageGallery}>
            {search.map((el) => (
              <ImageGalleryItem
                key={el.id}
                URL={el.webformatURL}
                clickOnImageItem={this.openModal}
              />
            ))}
          </ul>

          <Button btnLoad={this.handleChangePage} />

          {showModal && (
            <Modal>
              <h2>ops</h2>
            </Modal>
          )}
        </>
      );
    }
  }
}
