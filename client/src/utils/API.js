import axios from "axios";

export default {
  spotify: function() {
    return axios.post("/api/playlist").then(res => {
      console.log(res);
      return res.data;
    });
  },

  saveTodo: function(todoData) {
    return axios.post("/api/createtodos", todoData);
  },

  getTodos: function() {
    return axios.get("/api/todos").then(res => {
      return res.data;
    });
  },
  deleteTodo: function(id) {
    return axios.delete("/api/delete/" + id).then(res => {
      return res.data;
    });
  }
};
