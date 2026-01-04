import dbConnect from "@/lib/dbConnect";
import Parcel from "@/lib/models/Parcel";
import { NextResponse } from "next/server";

export async function GET (req:Request, {params}: {params:{id: string}}) {
    dbConnect();
    const {id} = params;
    const result = await Parcel.findById(id);

    return NextResponse.json(result);
}