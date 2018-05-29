const express = require("express");
const session = require("express-session");

const PORT = process.env.PORT || 4567;

const app = express();

app.use(
  session({
    secret: "some random string we should change for our application",
    resave: false,
    saveUninitialized: true
  })
);

app.set("view engine", "ejs");

app.get("/", (request, response) => {
  response.render("home/index");
});

app.post("/login", (request, response) => {});

app.post("/register", (request, response) => {});

app.get("/your-account", (request, response) => {
  response.send("Your balance has XXXXX dollars");
});

app.listen(PORT, () => {
  console.log(`Express web server listening on port ${PORT}`);
});
