const express = require("express");
const server = express();
const db = require("./data/dbConfig.js");
server.use(express.json());

server.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(400).json({ nope: "nope" });
    });
});

server.post("/", (req, res) => {
  const post = req.body;
  db("accounts")
    .insert(post, "id")
    .then(post => {
      res.status(200).json(post);
    });
});

server.put("/:id", (req, res) => {
  db("accounts")
    .where("id", "=", req.params.id)
    .update(req.body)
    .then(newPut => {
      res.status(200).json(newPut);
    })
    .catch(error => {
      res.status(500).json({ Error: "Server status: 500" });
    });
});

server.delete("/:id", (req, res) => {
  db("accounts")
    .where("id", "=", req.params.id)
    .del()
    .then(test => {
      res.status(200).json(test);
    })
    .catch(error => {
      res.status(500).json({ Error: "Server status: 500" });
    });
});

module.exports = server;
