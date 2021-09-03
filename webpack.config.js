import { path } from "path"

module.exports = {
  resolve: {
    extensions: ["", ".ts", ".js", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    descriptionFiles: ["package.json"],
    enforceExtension: false
  }
}
