"use client";

import { useEffect, useState } from "react";

// Live Dubai time in the top strip. It shows dashes on the server and on first paint, so the server and browser HTML match.
export default function Clock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="fs-clock" title="Local time in Dubai">
      DXB <b>{time}</b>
    </span>
  );
}
