import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEMO_USER_ID = 1; 

export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: DEMO_USER_ID },
    });

    // If no profile exists yet, return an empty object instead of null to prevent frontend crashes
    return NextResponse.json(profile || {});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const profile = await prisma.profile.upsert({
      where: { userId: DEMO_USER_ID },
      update: {
        fullName: body.fullName,
        lotNumber: body.lotNumber,
        phone: body.phone,
      },
      create: {
        userId: DEMO_USER_ID,
        fullName: body.fullName,
        lotNumber: body.lotNumber,
        phone: body.phone,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
