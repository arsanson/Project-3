const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//save a reference to the schema constructor

const Schema = mongoose.Schema;

//using the schema constructor, create a new TodosSchema object

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: [
            function (input) {
                return input.length >= 6;
            },
            "Password should be longer."
        ]
    }

    // todos: { type: Array },
    // name: {
    //     type: String,
    //     trim: true
    // },
    // email: {
    //     type: String,
    //     unique: true,
    //     match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    // },
    // genre: { type: String }


});

UserSchema.methods.comparePassword = function (inputPass) {

    return bcrypt.compareSync(inputPass, this.password);
};



UserSchema.pre("save", function (next) {

    //this.password - "actual password"

    //Rehash onlyif they update password

    if (!this.isModified("password")) return next();

    this.password = bcrypt.hashSync(this.password, 10)
    return next();
});

//This creates our model from the above schema, using mongoose model method

const User = mongoose.model("User", UserSchema);

//Export the Todos model

module.exports = User;