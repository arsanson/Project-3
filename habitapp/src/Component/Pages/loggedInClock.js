import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";
import React, { Component } from "react";
import song from "../Music/Cello.mp3";

class loginClock extends Component {
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
    console.log("props", props);
  }

  render() {
    var matches = document.querySelectorAll("span.count");
    let countSpan = 0;

    matches.forEach(match => {
      countSpan += parseInt(match.innerHTML);
      //   console.log(match);
      console.log(match.innerHTML);
    });
    // console.log(matches);

    const audio = new Audio(song);
    if (this.state.time === this.props.alarm) {
      audio.play();
    } else if (countSpan === 1) {
      audio.play();
    }

    // Alarm Clock Code Above

    return (
      <div id="alarm">
        <div
          className="outer"
          style={{
            left: "15%",
            marginLeft: "0"
          }}
        >
          <div
            id="timerOuter"
            className="outer"
            style={{ marginLeft: "0", top: "-15%" }}
          >
            <div id="timerInner" className="most-inner">
              <span>
                <h1 style={{ marginTop: "-25%" }}>Timer</h1>
                <div style={{ marginTop: "50%" }}>
                  {!this.props.totalTime && (
                    <CountdownTimer count={0} hideDay />
                  )}
                  {this.props.totalTime && (
                    <CountdownTimer count={this.props.totalTime} hideDay />
                  )}
                </div>
              </span>
            </div>
          </div>

          <div id="alarmOuter" className="outer" style={{ top: "-15%" }}>
            <div id="alarmInner" className="most-inner">
              <h1 style={{ marginTop: "-25%" }}>Alarm</h1>
              <div style={{ marginTop: "50%" }}>{this.props.alarm}</div>
            </div>
          </div>

          <div className="inner">
            <div className="most-inner">
              <span
                className={
                  this.state.time === "00:00:00" ? "time blink" : "time"
                }
                style={{ top: "10%" }}
              >
                {" "}
                <h1 style={{ fontSize: ".5em", marginTop: "20%" }}>
                  Current Time
                </h1>
                <div style={{ marginTop: "25%" }}>{this.state.time}</div>
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

export default loginClock;
