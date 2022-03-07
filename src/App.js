import React, { useEffect, useState } from "react";
import axios from "axios";
import { PriceChart } from "./PriceChart";
import "./styles.css";

function App() {
  const [initialData, setInitialData] = useState([]);
  const [period, setPeriod] = useState("1h");
  const today = new Date();
  const yesterday = new Date(today.getTime());
  yesterday.setDate(today.getDate() - 1);
  const [from_time, setFromTime] = useState(
    getISOStringWithoutSecsAndMillisecs(yesterday)
  );
  const [to_time, setToTime] = useState(
    getISOStringWithoutSecsAndMillisecs(today)
  );

  useEffect(() => {
    // fetch(
    //   `https://api.coinhall.org/api/v1/charts/terra/candles?from=${
    //     new Date(from_time).getTime() / 1000
    //   }&to=${
    //     new Date(to_time).getTime() / 1000
    //   }&interval=${period}&pairAddress=terra106a00unep7pvwvcck4wylt4fffjhgkf9a0u6eu&quoteAsset=uusd`
    // )
    axios
      .post("https://terra-trading-chart-api.herokuapp.com/api/chartdata", {
        from_time: new Date(from_time).getTime() / 1000,
        to_time: new Date(to_time).getTime() / 1000,
        period,
      })
      .then((response) => {
        setInitialData(response.data);
      });
  }, [from_time, to_time, period]);

  function getISOStringWithoutSecsAndMillisecs(date) {
    const dateAndTime = date.toISOString().split("T");
    const time = dateAndTime[1].split(":");
    return dateAndTime[0] + "T" + time[0] + ":" + time[1];
  }

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ backgroundColor: "#191c27", minHeight: "100vh" }}>
        <PriceChart
          initialData={initialData}
          loaded={initialData.length != 0}
        />
      </div>
      <div style={{ position: "absolute", top: 0, right: 0, zIndex: 10 }}>
        <input
          type="datetime-local"
          id="from-time"
          name="from-time"
          value={from_time}
          onChange={(e) => setFromTime(e.target.value)}
        />
        <span style={{ color: "white", padding: "0 10px" }}>~</span>
        <input
          type="datetime-local"
          id="to-time"
          name="to-time"
          value={to_time}
          onChange={(e) => setToTime(e.target.value)}
        />
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}>
        <div
          className={`period_button ${period == "1m" ? "active" : ""}`}
          onClick={() => setPeriod("1m")}
        >
          1 minute
        </div>
        <div
          className={`period_button ${period == "3m" ? "active" : ""}`}
          onClick={() => setPeriod("3m")}
        >
          3 minutes
        </div>
        <div
          className={`period_button ${period == "5m" ? "active" : ""}`}
          onClick={() => setPeriod("5m")}
        >
          5 minutes
        </div>
        <div
          className={`period_button ${period == "15m" ? "active" : ""}`}
          onClick={() => setPeriod("15m")}
        >
          15 minutes
        </div>
        <div
          className={`period_button ${period == "30m" ? "active" : ""}`}
          onClick={() => setPeriod("30m")}
        >
          30 minutes
        </div>
        <div
          className={`period_button ${period == "1h" ? "active" : ""}`}
          onClick={() => setPeriod("1h")}
        >
          1 hour
        </div>
        <div
          className={`period_button ${period == "4h" ? "active" : ""}`}
          onClick={() => setPeriod("4h")}
        >
          4 hours
        </div>
        <div
          className={`period_button ${period == "12h" ? "active" : ""}`}
          onClick={() => setPeriod("12h")}
        >
          12 hours
        </div>
        <div
          className={`period_button ${period == "1d" ? "active" : ""}`}
          onClick={() => setPeriod("1d")}
        >
          1 day
        </div>
      </div>
    </div>
  );
}

export default App;
