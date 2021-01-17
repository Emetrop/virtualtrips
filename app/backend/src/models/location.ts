import { Database } from 'sqlite'

import { ILocation } from '../interfaces/ILocation';

export default (db: Database) => ({
  // create: ...
  // update: ...
  // getLocation: ...
  // getLocations: ...
  getLocationsByName: (name: string) => {
    return db.all<ILocation[]>('SELECT * FROM Locations WHERE name LIKE :name', {
      ':name': name
    });
  }
});
