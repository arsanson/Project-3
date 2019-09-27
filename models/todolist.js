const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//using the schema constructor, create a new TodosSchema object

const TodolistSchema = new Schema({
  item: {
    type: String
  },

  userId: {
    type: String,
    ref: "User"
  }
});

//This creates our model from the above schema, using mongoose model method

const TodoList = mongoose.model("TodoList", TodolistSchema);

//Export the Todos model

module.exports = TodoList;
