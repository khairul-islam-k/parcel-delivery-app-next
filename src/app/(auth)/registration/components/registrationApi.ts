"use server";

import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { UserRegistration } from "@/types/user";

const registrationApi = async (data:UserRegistration) => {
    await dbConnect();

    const user = await User.findOne({email: data.email});
    if (user) {
        return JSON.stringify ({
        success: false,
        insertedId: null
    })
    }

    const result = await User.create(data);
    return JSON.stringify ({
        success: true,
        insertedId: result._id
    })
};

export default registrationApi;