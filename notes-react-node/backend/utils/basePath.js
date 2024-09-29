import path from "node:path";

const basePathTo = (pathTo) => {
  const __dirname = import.meta.dirname;
  const BASE_PATH = path.resolve(__dirname, pathTo);
  return BASE_PATH;
};

export default basePathTo;
