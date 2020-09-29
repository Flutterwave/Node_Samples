import pool from '../config/db';

pool.on('connect', () => {
  console.log('Connected');
});

const drop = () => {
  const customersTable = 'DROP TABLE IF EXISTS customers CASCADE';
  const transactionsTable = 'DROP TABLE IF EXISTS transactions CASCADE';
  const dropTables = `${customersTable};${transactionsTable};`;

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
  const customersTable = `CREATE TABLE IF NOT EXISTS
  customers(
    id SERIAL PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL
  )`;

  const transactionsTable = `CREATE TABLE IF NOT EXISTS
  transactions(
    id SERIAL PRIMARY KEY,
    transactions_id VARCHAR(50) NOT NULL,
    customer_id VARCHAR(50) NOT NULL,
    amount VARCHAR(50) NOT NULL,
    currency VARCHAR(50) NOT NULL,
    status TEXT NOT NULL
  )`;
 
  const migrationQueries = `${customersTable};${transactionsTable}`;
  pool.query(`${migrationQueries}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Database migration successfully executed!');
    }
    pool.end();
  });
};


export { drop, create };

// eslint-disable-next-line eol-last
require('make-runnable/custom')({
  printOutputFrame: false,
});