"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg = require('pg');
let pgConfig;
pgConfig = {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: '123123',
    database: 'postgres'
};
const pool = new pg.Pool(pgConfig);
exports.pool = pool;
//# sourceMappingURL=database.config.js.map