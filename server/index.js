#!/usr/bin/env node

/**
 * Module dependencies.
 */
import FirebaseHelper from "./firebaseHelper";
import app from "./app";
import debug from "debug";
import http from "http";

/**
 * Get port from environment and store in Express.
 */
const firebaseHelper = new FirebaseHelper();

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require("socket.io")(server);

io.on("connection", socket => {
  console.log('first conn: ', socket.id);
  let notes = [];
  firebaseHelper.getAllLocations([]).then(notes => {
    console.log(notes);
    io.to(socket.id).emit("INIT_CONN_EV", {
      notes: notes
    });
  });
  
  socket.on("FETCH_NOTE_EV", data => {
    firebaseHelper.getNote(data.guids)
    .then(notes => {
      io.to(socket.id).emit("SEND_NOTE", { notes });
    });
    
  });

  socket.on("PUSH_NOTE", data => {
    console.log('------------PUSH_NOTE: ', data.guid, data.latitude, data.longitude, data.message);
    firebaseHelper
      .postNote(data.guid, data.latitude, data.longitude, data.message)
      .then(() => {
        socket.broadcast.emit("INIT_CONN_EV", {
          message: firebaseHelper.getAllLocations([])
        });
      });
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, onListening);
server.on("error", onError);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("node:server")("Listening on " + bind);
}
