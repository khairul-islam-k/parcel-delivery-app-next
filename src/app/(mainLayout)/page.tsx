import dbConnect from "@/lib/dbConnect";
import Parcel from "@/lib/models/Parcel";

type Parcel = {
  _id: string;
  from: string;
  destination: string;
  category: string;
  weight: number;
  name: string;
};

export default async function Home() {
  await dbConnect();

  const data:Parcel[] = await Parcel.find();

  // const res = await fetch("http://localhost:3000/api/allParcels")
  // const data: Parcel[] = await res.json();
  return (
    <div>
      <h1>start my typeScript</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">From</th>
              <th className="border px-4 py-2 text-left">Destination</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Weight (kg)</th>
              <th className="border px-4 py-2 text-left">Sender</th>
            </tr>
          </thead>

          <tbody>
            {data.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{parcel.from}</td>
                <td className="border px-4 py-2">{parcel.destination}</td>
                <td className="border px-4 py-2 capitalize">
                  {parcel.category}
                </td>
                <td className="border px-4 py-2">{parcel.weight}</td>
                <td className="border px-4 py-2">{parcel.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
