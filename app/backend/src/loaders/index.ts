import express from 'express';

import expressLoader from './express';
import sqliteLoader from './sqlite';

export default async ({ expressApp }) => {
  const sqliteConnection = await sqliteLoader();
  expressApp.set("db", sqliteConnection);
  console.log('DB loaded and connected!');

  await expressLoader({ app: expressApp });
  console.log('Express loaded');
};
