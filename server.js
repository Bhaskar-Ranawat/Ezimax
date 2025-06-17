const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Ezimax technologies");
});

app.listen(port, () => {
  console.log(`The server is up at \n http://localhost:${port}`);
});
