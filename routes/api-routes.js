const jwt = require("jsonwebtoken");
const authWare = require("../middleware/authware");
const User = require("../models/User");
const TodoList = require("../models/TodoList");
const spotifyRequest = require("./spotify");
require("dotenv").config();

module.exports = function(app) {
  app.get("/api/protected", function(req, res) {
    res.json({
      message: "Super secret stuff. I mean really."
    });
  });

  app.get("/api/public", function(req, res) {
    res.json({
      message: "This is just boring, public data."
    });
  });

  app.get("/api/users", function(req, res) {
    User.find().then(function(users) {
      res.json(users);
    });
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    User.create(req.body)
      .then(function(data) {
        res.json({ message: "User Created!" });
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
      });
  });

  app.post("/api/createtodos", function(req, res) {
    TodoList.create(req.body)
      .then(function(data) {
        res.json({ message: "Todo Created" });
      })
      .catch(function(err) {
        res.status(500).json({
          error: err.message
        });
      });
  });

  app.get("/api/todos", function(req, res) {
    TodoList.find().then(function(todos) {
      res.json(todos);
    });
  });

  app.post("/api/authenticate", function(req, res) {
    const { username, password } = req.body;
    User.findOne({ username: username }).then(function(dbUser) {
      if (!dbUser)
        return res
          .status(401)
          .json({ message: "Username or Password is incorrect." });
      if (dbUser.comparePassword(password)) {
        //respond with a token
        const token = jwt.sign(
          {
            data: dbUser._id
          },
          process.env.SUPER_SECRET_KEY
        );

        res.json({
          id: dbUser._id,
          username: dbUser.username,
          token: token
        });
      } else {
        return res
          .status(401)
          .json({ message: "Username or Password is incorrect." });
      }
    });
  });

  app.get("/api/me", authWare, function(req, res) {
    res.json({
      id: req.user._id,
      username: req.user.username
    });
  });

  app.post("/api/playlist", spotifyRequest);
};
