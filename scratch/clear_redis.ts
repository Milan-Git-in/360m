import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://fair-marten-165803.upstash.io",
  token: "gQAAAAAAAoerAAIgcDE4OGNiNmMyMmNhZjQ0ZmMxOTFhNGYwOWZiNzg0OWEwOA",
});

async function run() {
  await redis.del("360events:passes");
  console.log("Deleted key 360events:passes");
}

run();
