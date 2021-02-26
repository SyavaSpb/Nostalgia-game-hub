const dev = {
  host: "localhost",
  port: "3000"
}
const prod = {
  host: "80.249.147.187",
  port: "80"
}

const modeBuild = process.argv[2]
const fs = require("fs")
if (modeBuild == "dev") {
  fs.writeFileSync("config.json", JSON.stringify(dev))
} else if (modeBuild == "prod") {
  fs.writeFileSync("config.json", JSON.stringify(prod))
} else {
  throw "mode isn't set"
}
