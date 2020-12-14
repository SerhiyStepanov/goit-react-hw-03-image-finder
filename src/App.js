import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";

export default class App extends Component {
  state = {
    search: "",
    page: 1,
  };

  handleFormSubmit = (search) => {
    this.setState({ search });
  };

  handlePageIncrement = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <div>
        <Searchbar fromSubmit={this.handleFormSubmit} />
        <ImageGallery search={this.state.search} page={this.state.page} />
        <Button btnLoad={this.handlePageIncrement} />
        <ToastContainer />
      </div>
    );
  }
}
