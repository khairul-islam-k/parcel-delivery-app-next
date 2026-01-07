import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("Mongodb uri is not defined");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache : MongooseCache | undefined;
}

const cached  = global.mongooseCache || {conn: null, promise: null};

const dbConnect = async () => {

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: "deliveryDB",
      bufferCommands: false
    });
  }

  cached.conn = await cached.promise;
  console.log("Mongodb Connected");
  return cached.conn;
};

export default dbConnect;
