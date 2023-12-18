import React from "react";
import Image from "next/image";
import dir from "@/markdown";
import style from "./index.module.css";

const DocsFC: React.FC<{
  params: {};
  searchParams: { page?: number };
}> = async ({ searchParams }) => {
  const { page = 1 } = searchParams;

  return (
    <main className={style["page"]}>
      <div>
        <div className={style["page-title"]}>Blog.</div>
        <div className={style["page-cover"]}>
          <Image
            layout="responsive"
            width={0}
            height={0}
            alt=""
            src="/cover.jpeg"
          />
        </div>
      </div>
      <div className={style["list-title"]}>list.</div>
      <div className={style["list-grid"]}>
        {dir.map((item, index) => (
          <a
            href={"/docs/" + item.path}
            key={index}
            className={style["item-link"]}
          >
            <div className={style["item-cover"]}>
              <Image
                layout="responsive"
                width={0}
                height={0}
                alt=""
                src={item.cover}
              />
            </div>

            <div className={style["item-info"]}>
              <div className={style["item-info-title"]}>{item.title}</div>
              <div className={style["item-info-createtime"]}>
                {item.create_time}
              </div>
              <div className={style["item-info-des"]}>{item.des}</div>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
};

export default DocsFC;
