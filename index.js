const express = require('express')
const redis = require("ioredis");
const client = redis.createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});


const port = 3000
app = express()

app.post("/", (req, res)=>{
  console.log(req)
})


client.on("error", (err) => {
  console.log("error" + err);
});

client.set("foo", "bar", (err, reply) => {
  if (err) console.log("ERROR!!!!!!!!!!!!!!!!!", err);
  console.log(reply);
});
client.get("foo", (err, reply) => {
  if (err) console.log("ERROR!!!!!!!!!!!!!!!!!", err);
  console.log(reply);
});

client.set("test", "hello I'm test data", (err, reply) =>{
  if(err) throw err
  console.log(reply)
})
const getTest = async() =>{
  const test = await client.get("test")
  console.log(test)
}
app.listen(port, ()=>{
  console.log(`node-redis server running on port:${port}`)
})