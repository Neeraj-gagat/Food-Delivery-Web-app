import Redis  from "ioredis";

const redis = new Redis({
    host: "",
    port: 6379,
});

export default redis;