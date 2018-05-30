const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const PORT = process.env.PORT || 4567;

const app = express();

const saltRounds = 10;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post("/login", async (request, response) => {
  User.findByUsername(request.body.username).then(user => {
    return bcrypt
      .compare(request.body.password, user.password_digest)
      .then(isCorrectPw => {
        if (isCorrectPw) {
          request.session.loggedIn = true;
          request.session.userId = user.id;
          response.redirect(301, "/your-account");
        }
        response.redirect(301, "/");
      });
  });
});

app.post("/register", (request, response) => {
  const password = request.body.password;
  bcrypt
    .hash(password, saltRounds)
    .then(hash => {
      const newUser = {
        username: request.body.username,
        password_digest: hash,
        balance: request.body.balance
      };
      return User.create(newUser);
    })
    .then(user => {
      request.session.loggedIn = true;
      request.session.userId = user.id;
      response.redirect(301, "/your-account");
    });
});

const requireLogin = (request, response, next) => {
  if (!request.session.loggedIn) {
    response.status(403).send("You do not have access");
  }
  next();
};

app.get("/your-account", requireLogin, (request, response) => {
  User.find(request.session.userId).then(user => {
    response.send(`Your balance has ${user.balance} dollars`);
  });
});

app.listen(PORT, () => {
  console.log(`Express web server listening on port ${PORT}`);
});
