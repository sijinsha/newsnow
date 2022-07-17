import React, { useEffect, useState } from "react";

function Datetime() {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <>
      <div className="date-info">
        <span>
          <span>
            {" "}
            {dateState.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </span>
        <span>
          <span style={{ paddingLeft: "5px" }}>
            {dateState.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        </span>
      </div>
    </>
  );
}

export default Datetime;
