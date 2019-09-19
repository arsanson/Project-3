const mongoose = require("mongoose");

//save a reference to the schema constructor

const Schema = mongoose.Schema;

//using the schema constructor, create a new TodosSchema object

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: "Username is Required"
    },
    password: {
        type: String,
        trim: true,
        required: "Password is required",
        validate: [
            function (input) {
                return input.length >= 6;
            },
            "Password should be longer."
        ]
    },
    spotify: {
        username: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        }
    },
    todos: { type: Array },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    genre: { type: String }


});

//This creates our model from the above schema, using mongoose model method

const User = mongoose.model("User", userSchema);

//Export the Todos model

module.exports = User;