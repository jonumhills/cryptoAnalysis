import mysql from "mysql2";
import db from "../config/db.config.js";
import fetch from "node-fetch";

let coinData = (req, res) => {
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
    //fetch coin transaction details from mysql
    let coin_data = `select coin,total_buy,total_sell,(total_buy/buy_coins) as avg_buy_price,
    (total_sell/sell_coins) as avg_sell_price,buy_coins,sell_coins from (
    select coin,sum(case when trade = "Buy" then total end) as total_buy,
                                 sum(case when trade = "Sell" then total end) as total_sell,
                                 sum(case when trade = "Buy" then volumne end) as buy_coins,
                                 sum(case when trade = "Sell" then volumne end) as sell_coins from coin_data group by coin ) a`;
    const d1 = conn.query(coin_data, async (err, results, fields) => {
      if (err) {
        console.log(err.message);
        return;
      }
      const json_data = {};
      const checkData = [];
      results.map((item) => {
        checkData.push({
          "coin Name": item.coin,
          "Total coins bought": item.buy_coins,
          "Total coins sold": item.sell_coins,
          "Total Amount in buying": item.total_buy,
          "Total Amount in selling": item.total_sell,
          "Average buy price": item.avg_buy_price,
          "Average sell price": item.avg_sell_price,
          "No of coins in account": item.buy_coins - item.sell_coins,
          live_price: 0,
          "Total P/L": 0,
        });
        json_data[item.coin] = {
          "Total coins bought": item.buy_coins,
          "Total coins sold": item.sell_coins,
          "Total Amount in buying": item.total_buy,
          "Total Amount in selling": item.total_sell,
          "Average buy price": item.avg_buy_price,
          "Average sell price": item.avg_sell_price,
          "No of coins in account": item.buy_coins - item.sell_coins,
          live_price: 0,
          "Total P/L": 0,
        };
      });

      //To fetch live data of a coin using API provided by WAZIRX
      const url = "https://api.wazirx.com/api/v2/tickers";
      const livedata = await fetch(url);
      const data = await livedata.json();
      checkData.map((obj) => {
        obj["live_price"] = data[obj["coin Name"].toLowerCase()].last;
        obj["Total P/L"] =
          obj["Total Amount in selling"] +
          obj["No of coins in account"] * obj.live_price -
          obj["Total Amount in buying"];
      });

      const logo_url = "https://cryptoicons.org/api/black/btc/200";
      const logo = await fetch(logo_url);
      console.log(checkData);
      res.send(checkData);
    });

    conn.end((err) => {
      if (err) {
        return console.log(err.message);
      }
    });
  });
};

export default coinData;
