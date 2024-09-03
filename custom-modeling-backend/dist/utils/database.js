"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PGSql = void 0;
const database_config_1 = require("../database.config");
class PGSql {
    static async sqlselect(sqlstr) {
        let res;
        const client = await database_config_1.pool.connect();
        res = await client.query(sqlstr);
        client.release();
        res = res.rows;
        return res;
    }
}
exports.PGSql = PGSql;
//# sourceMappingURL=database.js.map