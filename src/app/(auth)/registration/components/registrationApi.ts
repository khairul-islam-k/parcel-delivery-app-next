"use server";

import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { UserRegistration } from "@/types/user";
import bcrypt from "bcryptjs";

const registrationApi = async (data:UserRegistration) => {
    await dbConnect();

    const {password, ...res} = data;

    const hashPassword = await bcrypt.hash(password, 10);

    const newData = {password: hashPassword, ...res};

    const user = await User.findOne({email: data.email});
    if (user) {
        return JSON.stringify ({
        success: false,
        insertedId: null
    })
    }

    const result = await User.create(newData);

    return JSON.stringify ({
        success: true,
        insertedId: result._id
    })
};

export default registrationApi;