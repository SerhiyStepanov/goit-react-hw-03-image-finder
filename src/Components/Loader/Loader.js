// import { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loaded() {
  return (
    <div>
      <Loader
        style={{ textAlign: "center" }}
        type="ThreeDots"
        color="#3f51b5"
        height={100}
        width={100}
      />
    </div>
  );
}
