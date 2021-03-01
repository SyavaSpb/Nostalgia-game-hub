const dev = {
  mode: "development",
  host: "localhost",
  port: "3000",
  mongoip: "80.249.147.187",
  jwtSecret: "nghub"
}
const prod = {
  mode: "production",
  host: "80.249.147.187",
  port: "80",
  mongoip: "127.0.0.1",
  jwtSecret: "nghub"
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
