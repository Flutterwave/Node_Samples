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

 
  
}
export default UserService;