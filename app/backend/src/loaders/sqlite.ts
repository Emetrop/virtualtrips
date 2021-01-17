import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { promisify } from "es6-promisify";
import fs from 'fs'
import parse from 'csv-parse'

import config from '../config';

export default async (): Promise<Database> => {
  const access = promisify(fs.access);
  const readFile = promisify(fs.readFile);
  const parseCSV = promisify(parse);

  const exists = (file: string) => access(file).then((() => true)).catch(() => false);

  const isDBInit = await exists(config.dbFilename);
  const dataFileExists = await exists(config.dataFilename);

  if (!isDBInit && !dataFileExists) {
    throw new Error("DB init failed");
  }

  const db = await open({
    filename: config.dbFilename,
    driver: sqlite3.Database
  });

  if (isDBInit) {
    return db;
  }

  // Create db from tsv

  const data = await readFile(config.dataFilename, 'utf8');

  const rows = await parseCSV(data, {
    delimiter: "\t",
    skip_lines_with_error: true,
  });

  const values = rows.map(row => `(${row[0]},"${row[1].replace("\"", "\'")}","${row[4]}","${row[5]}")`).join(',');

  await db.run('CREATE TABLE Locations (id NUMBER, name TEXT, latitude TEXT, longitude TEXT)');
  await db.run(`INSERT INTO Locations (id, name, latitude, longitude) VALUES ${values}`);

  return db;
};
