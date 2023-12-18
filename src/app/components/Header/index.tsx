import React from "react";
import style from "./index.module.css";
import Search from "../Search";

const Header: React.FC = () => {
  return (
    <>
      <nav className={style["navBar"]}>
        <a href="/">
          <h1>My Blog</h1>
        </a>
        <div className={style["navList"]}>
          <a href="/">Home</a>
          <a href="/docs">Docs</a>
          <Search />
        </div>
      </nav>
      <div style={{ height: "50px" }}></div>
    </>
  );
};
export default Header;
