const Hapi = require('hapi');
const OrbitDB = require('orbit-db');
const ipfsAPI = require('ipfs-api');

const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' });
const orbitdb = new OrbitDB(ipfs);

let db;

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => 'Hello'
});

server.route({
  method: 'GET',
  path: '/store/{name}',
  handler: async (request, h) => {
    const name = request.params.name;
    const hash = await db.put({ _id: 'QmAwesomeIpfsHash', name, followers: 500 })
    return h.response(hash);
  }
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

  db = await orbitdb.docs("test", { indexBy: 'name' });
  console.log('Orbit Address: ' + db.address.toString());
};

process.on('unhandledRejection', (err) => {
  console.log('Error!:' + err);
  // process.exit(1);
});

init();