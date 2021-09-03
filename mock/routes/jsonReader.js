var fs = require("fs"); var json

class jsonReader {
  readJsonFileSync(filepath, encoding) {
    if (typeof (encoding) === "undefined") {
      encoding = "utf8"
    }
    var file = fs.readFileSync(filepath, encoding)
    return JSON.parse(file)
  }

  getFile(file) {
    var filepath = __dirname + "/../sampleFiles/" + file
    return this.readJsonFileSync(filepath)
  }
}

module.exports = jsonReader
