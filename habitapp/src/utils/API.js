import axios from "axios";

export default {
  spotify: function() {
    return axios.post("/api/playlist").then(res => {
      console.log(res);
      return res.data;
    });
  },

  createTodos: function() {
    return axios.post("/api/createtodo").then(res => {
      return res.data;
    });
  },

  getTodos: function() {
    return axios.get("/api/todos").then(res => {
      return res.data;
    });
  }
};
