import db from '../config/db';

class UserService {
  
  static async LoginUser(user) {
    const sql = 'SELECT * from userdetails WHERE username = $1';
    const bindParameters = [user.username];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
  }

  static async Groups(user) {
    const sql = 'SELECT * from groups WHERE userid = $1';
    const bindParameters = [user.id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
  }

  static async CreateGroup(record) {
    const sql = 'INSERT INTO groups (groupname, groupdesc, userid) VALUES($1, $2, $3) RETURNING *';
    const bindParameters = [record.group.gname, record.group.gdesc, record.user.id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
  }

  static async Members(id) {
    const sql = 'SELECT * from groupmembers WHERE groupid = $1';
    const bindParameters = [id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
  }

  static async CreateMember(record) {
    const sql = 'INSERT INTO groupmembers (groupid, bankname, staffname, staffbank, staffacctno, amount) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const bindParameters = [record.groupid, record.bankname, record.acctname, record.bank, record.acctno, record.salary];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
  }

 
  
}
export default UserService;