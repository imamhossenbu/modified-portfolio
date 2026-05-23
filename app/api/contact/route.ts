import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbzvU1CT9uVu-19r_S6hdW9ALqOlBMehklIT6tzx61Mfy0NynM6hrxDJB8eyDGsm2wd8bQ/exec";

    const formData = new URLSearchParams();
    formData.append("name", body.name);
    formData.append("email", body.email);
    formData.append("subject", body.subject);
    formData.append("message", body.message);

    const response = await fetch(scriptUrl, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const text = await response.text();

    return NextResponse.json({
      success: true,
      response: text,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message",
      },
      { status: 500 },
    );
  }
}
