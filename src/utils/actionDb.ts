import fs from "fs";
import path from "path";

interface DataModel {
  start: number;
  views: number;
}

const rootPath = path.resolve("./src/db");

export class DB {
  defaultData: DataModel = {
    start: 0,
    views: 0,
  };
  targetPath = "";

  constructor(targetPath: string[]) {
    if (!targetPath) return;
    this.targetPath = this.getFilePath(targetPath);

    this.setFileData("views", (value) => {
      return value + 1;
    });
  }
  // 路径是否存在
  isPathExist = (path: string) => fs.existsSync(path);
  // 获取文件路径
  getFilePath(targetPath: string[]) {
    const filePath = path.join(rootPath, targetPath.join("/") + ".json");
    // 如果路径不存在新建文件
    if (!this.isPathExist(filePath)) {
      const dirs = targetPath.slice(0, -1);
      if (dirs.length) {
        fs.mkdir(path.join(rootPath, dirs.join("/")), () => {
          fs.writeFileSync(filePath, JSON.stringify(this.defaultData), "utf-8");
        });
      } else {
        fs.writeFileSync(filePath, JSON.stringify(this.defaultData), "utf-8");
      }
    }
    return filePath;
  }
  // 获取文件内容
  getFileContent(): DataModel {
    return JSON.parse(fs.readFileSync(this.targetPath, "utf8"));
  }
  // 写入文件内容
  writeFile(data: DataModel) {
    fs.writeFileSync(this.targetPath, JSON.stringify(data));
  }
  setFileData<T extends keyof DataModel>(
    key: T,
    cb: (data: DataModel[T]) => DataModel[T],
  ) {
    const data = this.getFileContent();
    data[key] = cb(data[key]);
    this.writeFile(data);
  }
}
