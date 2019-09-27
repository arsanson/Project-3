const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

//Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/api-routes.js")(app);

//Serve up static assets(usually on heroku)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Route for retrieving all Users from the db
app.get("/user", function (req, res) {
  // Find all Users
  db.User.find({})
    .then(function (dbUser) {
      // If all Users are successfully found, send them back to the client
      res.json(dbUser);
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

//Route

//Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/userdb",
  { useNewUrlParser: true }
);

// start the server
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
