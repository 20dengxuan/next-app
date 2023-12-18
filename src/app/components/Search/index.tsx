"use client";

import { useState } from "react";
import style from "./index.module.css";
import dir from "@/markdown";

const Search: React.FC = () => {
  const [list, setList] = useState<{ title: string; path: string }[]>([]);

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
    <div className={style["search"]}>
      <input
        placeholder="搜索"
        type="text"
        onChange={inputChange}
        onFocus={inputChange}
        onBlur={(e) => {
          e.preventDefault();
          setTimeout(() => {
            setList([]);
          }, 100);
        }}
      />
      {!!list.length && (
        <div className={style["searchBox"]}>
          {list.map((item) => {
            return (
              <a href={"/docs/" + item.path} key={item.path}>
                {item.title}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
