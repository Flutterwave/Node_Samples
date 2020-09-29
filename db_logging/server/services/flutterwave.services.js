import db from '../config/db';

class UserService {
  
  static async addCustomerRecord(record) {
    const sql = 'INSERT INTO customers (customer_id, name, email, phone, address) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const bindParameters = [record.customerid, record.custname, record.custemail, record.custphone, record.meta];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rowCount;
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