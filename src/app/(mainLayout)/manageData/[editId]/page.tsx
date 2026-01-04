"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
    _id: string;
    from: string;
    destination: string;
    category: string;
    weight: number;
    name: string;
};

type CollectData = {
    from: string;
    destination: string;
    category: string;
    weight: number;
    name: string;
};

const EditParcel = ({ params }: { params: { editId: string } }) => {
    const { editId } = params;
    const [parcel, setParcel] = useState<FormValues | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            from: "",
            destination: "",
            category: "",
            weight: 0,
            name: ""

        }
    });

    const onSubmit = async (data: CollectData) => {

        const newData = { ...data, _id: parcel?._id }
        
        // 🔹 API call (optional)
        fetch("/api/parcelUpdata", {
            method: 'PUT',
            body: JSON.stringify(newData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => alert("successfully"));
    };

    useEffect(() => {
        fetch(`/api/parcel/${editId}`)
            .then(res => res.json())
            .then(data => setParcel(data))
    }, [editId])

    useEffect(() => {
        reset({
            from: parcel?.from,
            destination: parcel?.destination,
            category: parcel?.category,
            weight: parcel?.weight,
            name: parcel?.name
        })
    }, [parcel, reset])
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4 text-center">
                Send Parcel
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* From */}
                <div>
                    <label className="block font-medium">From</label>
                    <input
                        {...register("from", { required: "From is required" })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter sender location"
                    />
                    {errors.from && (
                        <p className="text-red-500 text-sm">{errors.from.message}</p>
                    )}
                </div>

                {/* Destination */}
                <div>
                    <label className="block font-medium">Destination</label>
                    <input
                        {...register("destination", { required: "Destination is required" })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter destination"
                    />
                    {errors.destination && (
                        <p className="text-red-500 text-sm">{errors.destination.message}</p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium">Category</label>
                    <select
                        {...register("category", { required: true })}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Select category</option>
                        <option value="document">Document</option>
                        <option value="parcel">Parcel</option>
                    </select>
                </div>

                {/* Weight */}
                <div>
                    <label className="block font-medium">Weight (kg)</label>
                    <input
                        type="number"
                        step="0.1"
                        {...register("weight", {
                            required: "Weight is required",
                            min: { value: 0.1, message: "Weight must be positive" },
                        })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter weight"
                    />
                    {errors.weight && (
                        <p className="text-red-500 text-sm">{errors.weight.message}</p>
                    )}
                </div>

                {/* Name */}
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter receiver name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditParcel;