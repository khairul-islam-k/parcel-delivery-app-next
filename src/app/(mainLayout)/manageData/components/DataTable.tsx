"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

type Parcel = {
  _id: string;
  from: string;
  destination: string;
  weight: number;
  category: string;
  name: string;
}

// type DataTableProps = {
//   data: Parcel[];
// };

const DataTable = ({ data }: { data: Parcel[] }) => {

  const session = useSession();
  console.log(session);

  // const [parcels, setParcels] = useState<Parcel[]>(data);


  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/parcels/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("Deleted successfully");
      window.location.reload(); // simple refresh
    }
  };

  // const handleEdit = (id: string) => {
  //   // future: redirect to edit page
  //   alert(`Edit clicked for id: ${id}`);
  // };
  return (
    <div className="overflow-x-auto p-4">
      <button onClick={() => signIn()}>Log in</button>
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">From</th>
            <th className="px-4 py-2 text-left">Destination</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Weight</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-2">{item.from}</td>
              <td className="px-4 py-2">{item.destination}</td>
              <td className="px-4 py-2 capitalize">{item.category}</td>
              <td className="px-4 py-2">{item.weight}</td>
              <td className="px-4 py-2">{item.name}</td>

              <td className="px-4 py-2 text-center space-x-2">
                <Link href={`/manageData/${item._id}`}>
                  <Button
                    // onClick={() => handleEdit(item._id)}
                    className="bg-emerald-500 hover:bg-teal-500"
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;