import React, { useEffect, useState } from "react";

function Datetime() {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    document.title = "News Now"
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <div className="date-info">
      <span className="date-info-date">
        {dateState.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>
      <span className="date-info-time">
        {dateState.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </span>
    </div>
  );
}

export default Datetime;
