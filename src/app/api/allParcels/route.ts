import dbConnect from "@/lib/dbConnect";
import Parcel from "@/lib/models/Parcel";
import { NextResponse } from "next/server";


export async function GET () {
    await dbConnect();
    const data = await Parcel.find();
    return NextResponse.json(data);
};
