import { pool } from '../database.config';

class PGSql {

  static async sqlselect(sqlstr:string) {
    let res;
    const client = await pool.connect();

    res = await client.query(sqlstr); 
  
    client.release();
    res = res.rows;
    return res;
  }
}

export {
  PGSql
}