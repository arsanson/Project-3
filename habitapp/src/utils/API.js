import axios from "axios";

export default {
  spotify: function() {
    return axios.post("/api/playlist").then(res => {
      console.log(res);
      return res.data;
    });
  }
};
