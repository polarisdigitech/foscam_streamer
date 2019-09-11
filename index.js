const express = require("express");
const server = express();

const cors = require("cors");

server.use(cors());
server.use(express.json());

const Stream = require("./node-rtsp-stream");
const streamUrl = "rtsp://admin:admin@129.18.160.10:554/11";

stream = new Stream({
  name: "foscam_stream",
  streamUrl: streamUrl,
  wsPort: 9999,
  width: 300,
  height: 200
});

server.get("/", (req, res) => {
  // let { user, pass, port } = req.query;
  let p = "";

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  for (let i = 0; i < 4; i++) {
    p += `${rand(0, 9)}`;
  }

  p = parseFloat(p);

  new Stream({
    name: "foscam_stream",
    streamUrl: streamUrl,
    wsPort: p,
    width: 300,
    height: 200
  });

  return res.json({ port: p });
});

const port = 3030;
server.listen(port, () => console.log(`Running @ ${port}`));
