var express = require("express");
var router = express.Router();
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/jobs", async (req, res) => {
  const searchTerm = req.query.search;
  try {
    redis.get(searchTerm, async (err, jobs) => {
      if (err) throw err;

      if (jobs) {
        res.status(200).send({
          jobs: JSON.parse(jobs),
          message: "data retrieved from the cache",
        });
      } else {
        const jobs = await axios.get(
          `https://jsonplaceholder.typicode.com/${searchTerm}`
        );
        redis.setex(searchTerm, 600, JSON.stringify(jobs.data));
        res.status(200).send({
          jobs: jobs.data,
          message: "cache miss",
        });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
