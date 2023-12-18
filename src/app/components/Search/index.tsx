"use client";

import { useState } from "react";
import style from "./index.module.css";
import dir from "@/markdown";

const Search: React.FC = () => {
  const [list, setList] = useState<{ title: string; path: string }[]>([]);
  const [isShow, setShow] = useState(false);
  const inputChange: React.ChangeEventHandler<HTMLInputElement> = (v) => {
    if (v.target.value) {
      setList(
        Object.keys(dir)
          .map((key) => {
            return {
              path: dir[key].path,
              title: dir[key].title,
            };
          })
          .filter((item) =>
            item.title.toUpperCase().includes(v.target.value.toUpperCase()),
          ),
      );
    } else {
      setList([]);
    }
  };

  return (
    <>
      <a onClick={() => setShow(true)}>Search</a>
      {isShow && (
        <>
          <div className={style["mark"]} onClick={() => setShow(false)}></div>
          <div className={style["search"]}>
            <input
              placeholder="search"
              type="text"
              onChange={inputChange}
              onFocus={inputChange}
            />

            <div className={style["searchBox"]}>
              {list.map((item) => {
                return (
                  <div key={item.path}>
                    <a href={"/docs/" + item.path}>{item.title}</a>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Search;
