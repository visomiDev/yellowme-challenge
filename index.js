const db = require('./src/db');
const server = require('./src/server');

async function main() {
  await db();
  await server();
}

main();
