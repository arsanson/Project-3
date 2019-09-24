const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routes");
const app = express();
const port = 3000;

//Define middleware here 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Serve up static assets(usually on heroku)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//add routes, both API and view
// app.use(routes);
// app.get('/', (req, res) => res.send('Hello World!'))

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

//Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 3000);


// start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))