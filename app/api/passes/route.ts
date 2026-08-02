import { NextResponse } from "next/server";
import { getRedis } from "../../lib/redis";
import { defaultPasses } from "../../data/passes";

export const runtime = "edge";

const REDIS_KEY = "360events:passes";

export async function GET() {
  try {
    const redis = getRedis();
    let data = await redis.get(REDIS_KEY);

    // If no data exists yet, seed with defaults
    if (!data) {
      await redis.set(REDIS_KEY, defaultPasses);
      data = defaultPasses;
    }

    // Ensure it's not double stringified from a previous mistake
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (e) {
        // ignore
      }
    }
    
    console.log("API sending data type:", typeof data, "IsArray:", Array.isArray(data));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching passes from Redis:", error);
    // Fallback to default passes if Redis is completely down
    return new Response(JSON.stringify(defaultPasses), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function POST(request: Request) {
  try {
    const { password, passes } = await request.json();

    // Basic security for the API route
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!Array.isArray(passes)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Save to Redis
    const redis = getRedis();
    await redis.set(REDIS_KEY, passes);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving passes to Redis:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
