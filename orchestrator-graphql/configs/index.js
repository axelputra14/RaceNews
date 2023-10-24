const Redis = require("ioredis");

const redis = new Redis({
  port: 10553, // Redis port
  host: "redis-10553.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "f2Ed3o96Ee5uOReotZf3HLatUQUNTkiY",
  db: 0, // Defaults to 0
});

module.exports = redis;
