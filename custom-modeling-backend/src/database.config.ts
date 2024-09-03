const pg = require('pg');
let pgConfig;
pgConfig = {
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: '123123',
  database: 'postgres'
}
// if(process.env.NODE_ENV == "production") {
//   pgConfig = {
//     host: '50.120.96.132',
//     port: '25308',
//     user: 'scfj',
//     password: 'Sckx3381',
//     database: 'data001'
//   }
// }
// else {
//   pgConfig = {
//     host: 'localhost',
//     port: '5432',
//     user: 'postgres',
//     password: 'root',
//     database: 'postgres'
//   }
// }
const pool = new pg.Pool(pgConfig);
export {
  pool,
}