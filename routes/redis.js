var express = require("express");
var router = express.Router();
const Redis = require("ioredis");
const redis = new Redis();
router.get("/get", function (req, res, next) {
  var payloadKey = JSON.parse(req.query.payload).getText;
  redis.get(payloadKey, (err, reply) => {
    if (err) throw err;
    res.send(reply);
  });
});
router.get("/getKeyList", async (req, res) => {
  console.log(req.query);
  const keyList = await redis.keys("*");
  res.send(keyList);
});
router.post("/post", (req, res) => {
  var payload = JSON.parse(req.body.payload);
  var payloadKey = payload.postTextKey;
  var payloadVal = payload.postTextVal;
  redis.set(payloadKey, payloadVal);
  res.send("Got a POST request");
});
router.put("/put", (req, res) => {
  var payload = JSON.parse(req.body.payload);
  var payloadKey = payload.putTextKey;
  var payloadVal = payload.putTextVal;
  redis.set(payloadKey, payloadVal);
  res.send("Got a PUT request at /user");
});
router.delete("/delete", async (req, res) => {
  const key = req.body.payload.delText;
  await redis.del(key, (err, reply) => {
    if (err) throw err;
    console.log(reply);
  });
  res.send("Got a DELETE request at /user");
});

module.exports = router;
