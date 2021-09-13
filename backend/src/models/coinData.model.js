import mysql from "mysql2";
import db from "../config/db.config.js";

let insert = (coinData) => {
  // console.log(coinData);
  let conn = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
  });

  conn.connect((err) => {
    if (err) {
      return console.error("error: " + err.message);
    }

    let coin_data = `create table if not exists coin_data
   (date varchar(100),coin varchar(100),price float,volumne float,total varchar(100),trade varchar(100),fee float,
   constraint pk primary key(date,coin,total))`;

    conn.query(coin_data, (err, results, fields) => {
      if (err) {
        console.log(err.message);
      }
    });
    console.log("coin_data created");
    for (let row in coinData) {
      let insert_q =
        'insert into coin_data values("' +
        coinData[row][0] +
        '","' +
        coinData[row][1] +
        '",' +
        coinData[row][2] +
        "," +
        coinData[row][3] +
        "," +
        coinData[row][4] +
        ',"' +
        coinData[row][5] +
        '",' +
        coinData[row][6] +
        ")";

      conn.query(insert_q, (err, results, fields) => {
        if (err) {
          console.log(err);
        }
      });
    }

    conn.end((err) => {
      if (err) {
        return console.log(err.message);
      }
    });
  });
};

export default insert;
