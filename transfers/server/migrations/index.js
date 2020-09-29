import pool from '../config/db';

pool.on('connect', () => {
  console.log('Connected');
});

const drop = () => {
  const userdetails = 'DROP TABLE IF EXISTS userdetails CASCADE';
  const groupsTable = 'DROP TABLE IF EXISTS groups CASCADE';
  const groupMembersTable = 'DROP TABLE IF EXISTS groupmembers CASCADE';
  const dropTables = `${userdetails};${groupsTable};${groupMembersTable};`;

  pool.query(`${dropTables}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Tables dropped');
    }
    pool.end();
  });
};

const create = () => {
  const userdetails = `CREATE TABLE IF NOT EXISTS
  userdetails(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    fullname VARCHAR(50) NOT NULL,
    walletamount VARCHAR(50) NOT NULL
  )`;

  const groupsTable = `CREATE TABLE IF NOT EXISTS
  groups(
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL,
    groupname VARCHAR(50) NOT NULL,
    groupdesc VARCHAR(50) NOT NULL,
    CONSTRAINT fk_owner FOREIGN KEY (userid) REFERENCES  userdetails (id)
  )`;

  const groupMembersTable = `CREATE TABLE IF NOT EXISTS
  groupmembers(
    id SERIAL PRIMARY KEY,
    groupid INTEGER NOT NULL,
    staffname VARCHAR(50) NOT NULL,
    staffbank VARCHAR(50) NOT NULL,
    staffacctno VARCHAR(50) NOT NULL,
    amount VARCHAR(50) NOT NULL,
    CONSTRAINT fk_owner FOREIGN KEY (groupid) REFERENCES  groups (id)
  )`;
 
  const migrationQueries = `${userdetails};${groupsTable};${groupMembersTable}`;
  pool.query(`${migrationQueries}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Database migration successfully executed!');
    }
    pool.end();
  });
};

const addItem = () => {
  pool.query(
    "INSERT INTO userdetails (username, password, fullname, walletamount) SELECT * FROM UNNEST ($1::text[], $2::text[],  $3::text[], $4::text[])",
    [
      [
        "user",
      ],
      [
        "password1",
      ],
      ["Joel Ugwumadu"],
      ["100000"],
    ]
  );


}


export { drop, create, addItem};

// eslint-disable-next-line eol-last
require('make-runnable/custom')({
  printOutputFrame: false,
});