import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Contact Form Submission:", body);

    return NextResponse.json({
      ok: true,
      message: "Your message has been received successfully.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to process your request.",
      },
      {
        status: 500,
      }
    );
  }
}