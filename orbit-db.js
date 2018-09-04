const OrbitDB = require('orbit-db');

let db;

const startDb = ({
  dbName = "WeeklyRace",
  store = null,
  ipfs = null
}) =>
  new Promise(async (resolve, reject) => {
    if (!store) {
      throw new Error('you must provide a store');
    }

    if (!ipfs) {
      throw new Error('you must provide an ipfs deamon connection');
    }

    try {
      OrbitDB.addDatabaseType(store.type, store);
      const orbitdb = new OrbitDB(ipfs);

      db = await orbitdb.open(dbName, {
        type: store.type,
        create: true
      });
      await db.load();
      console.log('Orbit Address: ' + db.address.toString());

      resolve(db);
    } catch (err) {
      reject(err);
    }
  });

const insert = async (id, tokens = []) =>
  await db.put({ _id: id, _tokens: tokens });

module.exports = {
  startDb,
  insert
}