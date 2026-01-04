import dbConnect from "@/lib/dbConnect";
import Parcel from "@/lib/models/Parcel";
import DataTable from "./components/DataTable";

type ParcelType = {
  _id: string;
  from: string;
  destination: string;
  weight: number;
  category: string;
  name: string;
};

const ManageData = async () => {
  await dbConnect();

  const parcels = await Parcel.find().lean();

  return (
    <div>
      <h3 className="text-center my-6 text-xl font-bold">
        All Manage Data
      </h3>

      <DataTable
        data={JSON.parse(JSON.stringify(parcels)) as ParcelType[]}
      />
    </div>
  );
};

export default ManageData;
