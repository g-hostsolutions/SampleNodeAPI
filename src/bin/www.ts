import app from "../app";
import mongoose from "../config/db";

const normalizePort = (val: string) => {
  const p = parseInt(val, 10);

  if (isNaN(p)) {
    return val;
  }

  if (p >= 0) {
    return p;
  }

  return false;
};

const onError = (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const bind = typeof port === "string" ? `pipe ${port}` : `port ${port}`;
  console.log("Listening on ", bind);
  console.log("[NODE_ENV]: ", process.env.NODE_ENV);
};

const connection = mongoose?.Connection?.name;
const port = normalizePort(process.env.PORT || "3000");
app.on("error", onError);
app.on("listening", onListening);
app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port} on ${connection}`
  );
});
