import React, { Component } from "react";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    search: "",
  };

  handleChangeSearch = (e) => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.search.trim() === "") {
      toast.error(" Введите параметры поиска !", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    this.props.fromSubmit(this.state.search);
    this.setState({ search: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleChangeSearch}
            className={s.SearchFormInput}
            type="text"
            name="search"
            value={this.state.search}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
