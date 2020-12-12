import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";

export default class App extends Component {
  state = {
    search: "",
  };

  handleFormSubmit = (search) => {
    this.setState({ search });
  };
  render() {
    return (
      <div>
        <Searchbar fromSubmit={this.handleFormSubmit} />
        <ImageGallery search={this.state.search} />
        <ToastContainer />
      </div>
    );
  }
}
