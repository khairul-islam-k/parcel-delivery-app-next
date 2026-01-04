import dbConnect from "@/lib/dbConnect";
import Parcel from "@/lib/models/Parcel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE (req:Request,{params}:{params:{id: string}}) {
    await dbConnect();
    const {id} = await params;
    const result = await Parcel.findByIdAndDelete(id);

    revalidatePath("/");
    revalidatePath("/manageData");

    return NextResponse.json({
        success: true,
        deleteId: id
    });
}