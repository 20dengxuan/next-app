import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import style from "./index.module.css";
import dir from "@/markdown";
import Image from "next/image";

const fs = require("fs");
const path = require("path");
let fileDir = path.resolve("./src/markdown");

const Detail: React.FC<{ params: { path: string[] } }> = async (props) => {
  const { path: reqPath } = props.params;
  let content = "";
  let isNotFound = false;

  try {
    const mdFilePath = path.join(fileDir, reqPath.join("/") + ".md");
    content = fs.readFileSync(mdFilePath, "utf8");
  } catch {
    isNotFound = true;
  }

  return isNotFound ? (
    "404"
  ) : (
    <div className={style["page"]}>
      <div>
        <h1>{dir?.[reqPath.join("/")]?.title || ""}</h1>
        <h6>{dir?.[reqPath.join("/")]?.create_time || ""}</h6>
        {dir?.[reqPath.join("/")]?.cover && (
          <div style={{ display: "block" }}>
            <Image
              layout="responsive"
              width={0}
              height={0}
              alt=""
              src={dir?.[reqPath.join("/")]?.cover || ""}
            ></Image>
          </div>
        )}

        <Markdown
          className={style["markdown"]}
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  showLineNumbers={true}
                  PreTag="div"
                  language={match[1]}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};

export default Detail;
