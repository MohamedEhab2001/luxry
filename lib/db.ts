import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxry';

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

if (!global.mongooseConn) {
  global.mongooseConn = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (global.mongooseConn?.conn) return global.mongooseConn.conn;

  if (!global.mongooseConn?.promise) {
    global.mongooseConn!.promise = mongoose.connect(MONGODB_URI, { dbName: 'luxry' });
  }

  try {
    global.mongooseConn!.conn = await global.mongooseConn!.promise;
  } catch (error) {
    global.mongooseConn!.promise = null;
    throw error;
  }

  return global.mongooseConn!.conn;
}
