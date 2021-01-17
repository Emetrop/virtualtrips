import { Database } from 'sqlite'

import location from '../models/location'

// all business logic suppose to be here

export default (db: Database) => ({
  // getLocation: ...
  getLocationsByNameSearch: (search: string) => {
    return location(db).getLocationsByName(`${search}%`);
  }
});
