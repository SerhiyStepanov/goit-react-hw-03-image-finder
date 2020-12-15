import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    console.log("didMount");
  }

  componentWillUnmount() {
    console.log("willMount");
  }
  redder() {
    return createPortal(
      <div className={s.backdrop}>
        <div className={s.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
