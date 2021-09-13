import React, { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const portfolioUrl = "http://192.168.1.5:8080/portfolio";
    const fetchData = async () => {
      try {
        const response = await fetch(portfolioUrl);
        const json = await response.json();
        setData(json);
        console.log(Object.keys(json[0]));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Coin Portfolio</h1>
      <table className="container">
        <tr>
          <th>
            <h3>COIN</h3>
          </th>
          <th>
            <h3>COINS BOUGHT</h3>
          </th>
          <th>
            <h3>COINS SOLD</h3>
          </th>
          <th>
            <h3>AVG BUY </h3>
          </th>
          <th>
            <h3>AVG SELL</h3>
          </th>
          <th>
            <h3>COINS AVAILABLE</h3>
          </th>
          <th>
            <h3>P/L</h3>
          </th>
          <th>
            <h3>TOTAL AMT IN BUYING</h3>
          </th>
          <th>
            <h3>TOTAL AMT IN SELLING</h3>
          </th>
          <th>
            <h3>LIVE PRICE</h3>
          </th>
        </tr>
        {data.map((item) => {
          return (
            <tr>
              <td>{item["coin Name"]}</td>
              <td>{item["Total coins bought"]}</td>
              <td>{item["Total coins sold"]}</td>
              <td>{item["Average buy price"]}</td>
              <td>{item["Average sell price"]}</td>
              <td>{item["No of coins in account"]}</td>
              <td className={item["Total P/L"] < 0 ? "negative" : "positive"}>
                {item["Total P/L"]}
              </td>
              <td>{item["Total Amount in buying"]}</td>
              <td>{item["Total Amount in selling"]}</td>
              <td>{item["live_price"]}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
