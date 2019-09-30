import React, { Component } from "react";
import { Doughnut } from "react-chartjs-3";

class chart extends Component {
  state = {
    visible: false,
    show: false,
    totalTime: "",
    hrs: "",
    min: "",
    seconds: "",
    alarm: "00:00:00",
    isTimerPaused: true,
    spotifyId: ""
  };

  render() {
    const data = {
      labels: ["Red", "Green", "Yellow"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ],
      text: "23%"
    };

    return <Doughnut data={data} height={150} />;
  }
}

export default chart;
