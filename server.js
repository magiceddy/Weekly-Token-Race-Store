const Hapi = require('hapi');
const ipfsAPI = require('ipfs-api');
const OrbitDB = require('./orbit-db');
const TokenStore = require('orbitdb-tokenstore');
const routes = require('./routes/index');
const plugins = require('./modules/plugins');

const tokenStoreConfig = {
  dbName: 'WeeklyRace',
  store: TokenStore,
  ipfs: ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })
}

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

const init = async () => {
  await server.register(plugins);

  server.route(routes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

  db = await OrbitDB.startDb(tokenStoreConfig);
};

process.on('unhandledRejection', (err) => {
  console.log('Error!:' + err);
  // process.exit(1);
});

init();