import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const fs = require("fs");
const path = require("path");
let dir = path.resolve("./src/markdown");

const Detail: React.FC<{ params: { path: string[] } }> = async (props) => {
  const { path: reqPath } = props.params;

  const mdFilePath = path.join(dir, reqPath.join("/") + ".md");
  const content = fs.readFileSync(mdFilePath, "utf8");

  return (
    <Markdown
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
  );
};

export default Detail;
