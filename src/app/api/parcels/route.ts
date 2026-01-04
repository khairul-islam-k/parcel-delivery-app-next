export const runtime = "nodejs";

import dbConnect from "@/lib/dbConnect";
import Parcel from "@/lib/models/Parcel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();

  const result = await Parcel.create(data);
  revalidatePath("/");
  revalidatePath("/manageData");

  return NextResponse.json({
    success: true,
    _id: result._id,
  });
}
