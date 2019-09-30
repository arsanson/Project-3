import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";
import React, { Component } from "react";
import song from "../Music/Cello.mp3";

class clock extends Component {
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

  getInitialState = () => {
    return {
      time: "00:00:00",
      amPm: "am"
    };
  };

  componentDidMount = () => {
    setInterval(this.getTime, 1000);
  };

  getTime = () => {
    const takeTwelve = n => (n > 12 ? n - 12 : n),
      addZero = n => (n < 10 ? "0" + n : n);

    let d, h, m, s, t, amPm;

    d = new Date();
    h = addZero(takeTwelve(d.getHours()));
    m = addZero(d.getMinutes());
    s = addZero(d.getSeconds());
    t = `${h}:${m}:${s}`;

    amPm = d.getHours() >= 12 ? "pm" : "am";

    this.setState({
      time: t,
      amPm: amPm
    });
  };

  CountdownTimer(props) {
    // console.log("props", props);
  }

  render() {
    var matches = document.querySelectorAll("span.count");
    let countSpan = 0;

    matches.forEach(match => {
      countSpan += parseInt(match.innerHTML);
      //   console.log(match);
      //console.log(match.innerHTML);
    });
    // console.log(matches);

    const audio = new Audio(song);
    if (this.state.time === this.props.alarm) {
      audio.play();
    } else if (countSpan === 2) {
      alert("times up");
      audio.play();
    }

    // Alarm Clock Code Above

    return (
      <div id="container">
        <div className="outer">
          <div id="timerOuter" className="outer">
            <div id="timerInner" className="most-inner">
              <span>
                <h1>Timer</h1>
                {!this.props.totalTime && <CountdownTimer count={0} hideDay />}
                {this.props.totalTime && (
                  <CountdownTimer count={this.props.totalTime} hideDay />
                )}
                {this.timesUp}
              </span>
            </div>
          </div>

          <div id="alarmOuter" className="outer">
            <div id="alarmInner" className="most-inner">
              <h1>Alarm</h1>

              {this.props.alarm}
            </div>
          </div>

          <div className="inner">
            <div className="most-inner">
              <span
                className={
                  this.state.time === "00:00:00" ? "time blink" : "time"
                }
              >
                {" "}
                <h1 style={{ fontSize: ".5em" }}>Current Time</h1>
                {this.state.time}
              </span>
              <span className="amPm">{this.state.amPm}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default clock;
