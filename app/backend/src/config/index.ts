import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),
  dbFilename: process.env.DB_FILENAME,
  dataFilename: process.env.DATA_FILENAME,
  apiPrefix: process.env.API_PREFIX || "/",
};
