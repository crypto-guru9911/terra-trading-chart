import React, { useEffect, useState } from "react";
import { PriceChart } from "./PriceChart";
import "./styles.css";

function App() {
  const [initialData, setInitialData] = useState([]);
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
    console.log("sdfsdf");
    fetch(
      `https://api.coinhall.org/api/v1/charts/terra/candles?from=${
        new Date(from_time).getTime() / 1000
      }&to=${
        new Date(to_time).getTime() / 1000
      }&interval=1h&pairAddress=terra106a00unep7pvwvcck4wylt4fffjhgkf9a0u6eu&quoteAsset=uusd`
    )
      .then((response) => response.json())
      .then((data) => {
        setInitialData(data);
      });
  }, [from_time, to_time]);

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
    </div>
  );
}

export default App;
