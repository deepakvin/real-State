import { NextResponse } from "next/server";
import ogs from "open-graph-scraper";

export async function GET(req, context) {
  const url = `https://www.magicbricks.com/new-projects-${context?.params?.id}`;

  try {
    const userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36";

    // Await the `ogs` result
    const data = await ogs({
      url: url,
      fetchOptions: { headers: { "user-agent": userAgent } },
    });

    const { error, result } = data;

    console.log("data", result)
    if (error) {
      return NextResponse.json({ success: false, error: result });
    }

    // Return the Open Graph result as JSON
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching Open Graph data:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch Open Graph data" });
  }
}