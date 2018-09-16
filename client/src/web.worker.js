/* eslint-disable */

const interval = self.setInterval(() => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    });
  }
}, 2000);

addEventListener(
  "message",
  e => {
    console.log("Message from Main Thread", e.data);
  },
  false
);
