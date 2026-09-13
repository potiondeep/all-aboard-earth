import React from "react";
import ReactDOM from "react-dom/client";
import App from "./AllAboardEarthPrototype.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// preview-only divider tuning panel (?tune); kept out of the main bundle
if (new URLSearchParams(location.search).has("tune")) {
  import("./ornaments/DividerTunePanel.jsx").then(({ default: Panel }) => {
    const host = document.body.appendChild(document.createElement("div"));
    ReactDOM.createRoot(host).render(<Panel />);
  });
}
