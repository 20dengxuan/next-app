import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import style from "./index.module.css";
import { DB } from "@/utils/actionDb";

const fs = require("fs");
const path = require("path");
let dir = path.resolve("./src/markdown");

const Detail: React.FC<{ params: { path: string[] } }> = async (props) => {
  const { path: reqPath } = props.params;
  let content = "";
  let isNotFound = false;

  try {
    const mdFilePath = path.join(dir, reqPath.join("/") + ".md");
    content = fs.readFileSync(mdFilePath, "utf8");
  } catch {
    isNotFound = true;
  }

  const db = new DB(reqPath);

  const data = db.getFileContent();

  return isNotFound ? (
    "404"
  ) : (
    <div className={style["page"]}>
      <div>
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

        <div>查看 {data?.views || 0}</div>
      </div>
    </div>
  );
};

export default Detail;
