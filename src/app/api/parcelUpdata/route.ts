import dbConnect from "@/lib/dbConnect";
import Parcel from "@/lib/models/Parcel";
import { NextResponse } from "next/server";

type FormValues = {
    _id: string;
    from: string;
    destination: string;
    category: string;
    weight: number;
    name: string;
};
export async function PUT(req:Request) {
    await dbConnect();
    const {_id, ...body}:FormValues = await req.json();

    const result = await Parcel.findByIdAndUpdate(
        _id,
        body,
        {new: true, runValidators: true}
    );

    return NextResponse.json({
        success: true,
        updateId: result._id
    })
}