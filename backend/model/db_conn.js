import mysql from "mysql";

//database credentials
const db_credentials = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "portfolio",
};

//connection to MYSQL
const conn = mysql.createConnection({
  host: db_credentials.host,
  user: db_credentials.user,
  password: db_credentials.password,
  database: db_credentials.database,
});

conn.connect((err) => {
  if (err) {
    console.log(err.stack);
    return;
  }
  console.log("connected to MySQl");
});

conn.query("SELECT count(*) FROM coin_data", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});

conn.end();

// let insert = (data) => {
//   query = "insert into"
// }
