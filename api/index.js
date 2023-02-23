const port = process.env.PORT || 3333;
const host = process.env.HOST || "localhost";

const app = require("./src/main");

const http = require("http");
const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
