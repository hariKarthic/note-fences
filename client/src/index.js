import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
require("es6-promise").polyfill(); // ie polyfill
const initApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
  registerServiceWorker();
};

if (window.Raven) {
  // configure and install sentry
  window.Raven.config(
    "https://a46dee972cca4fd2b517fe1af1f1b671@sentry.io/1281689"
  ).install();
  window.Raven.context(initApp);
  console.info("Sentry configuration done!");
} else {
  initApp();
}
