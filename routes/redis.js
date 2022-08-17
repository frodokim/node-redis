var express = require("express");
var router = express.Router();
const Redis = require("ioredis");
const redis = new Redis();
router.get("/get", function (req, res, next) {
  var payloadKey = JSON.parse(req.query.payload).getText;
  redis.get(payloadKey, (err, reply) => {
    if (err) throw err;
    console.log("CALLBACK FUNCTION:", reply);
    res.send(reply);
  });
});
router.post("/post", (req, res) => {
  console.log("POST REACHED!!!!!!!!!", payload);
  var payload = JSON.parse(req.body.payload);
  var payloadKey = payload.postTextKey;
  var payloadVal = payload.postTextVal;
  redis.set(payloadKey, payloadVal);
  res.send("Got a POST request");
});
router.put("/put", (req, res) => {
  res.send("Got a PUT request at /user");
});
router.delete("/delete", (req, res) => {
  res.send("Got a DELETE request at /user");
});

module.exports = router;
