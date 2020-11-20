const express = require("express");
const fs = require("fs");
const path = require("path");
const hbs = require("hbs");
const app = express();

const port = process.env.PORT || 3002;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
console.log(partialsPath);

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/quotes", (req, res) => {
  const data = fs.readFileSync("data.json", "utf-8");
  const JSONdata = JSON.parse(data);

  const characterName = req.query.character;
  const characterInfo = JSONdata.find((d) => d.name === characterName);

  if (characterInfo) {
    res.send(characterInfo);
  } else {
    res.send({
      error: "something went wrong!",
    });
  }
});

app.listen(port, () => {
  console.log("Its Running Fine on port" + port);
});
