import db from '../config/db';

class UserService {
  
  static async updateCustomerRecord(record, user) {
    const sql = 'UPDATE userdetails SET walletamount = $1 WHERE id = $2 RETURNING *';
    const sum = Number(record.data.amountsettledforthistransaction) + Number(user.walletamount)
    const bindParameters = [Math.ceil(sum), user.id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows[0];
   
  }

  static async addTransactionRecord(record) {
    const sql = 'INSERT INTO transactions (transactions_id, customer_id, amount, currency, status) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const bindParameters = [record.data.txid, record.data.customerid, record.data.custemail, record.data.amountsettledforthistransaction, record.status];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rowCount;
  }

  static async getCustomerRecord() {
    const sql = 'SELECT * from customers';
    const client = await db.connect();
    const result = await client.query(sql);
    client.release();
    return result.rows;
  }

  static async getTransactionRecord() {
    const sql = 'SELECT * from transactions';
    const client = await db.connect();
    const result = await client.query(sql);
    client.release();
    return result.rows;
  }

  
}
export default UserService;