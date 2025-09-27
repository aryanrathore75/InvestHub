import { useEffect, useState } from "react";
import axios from "axios";
import { VerticalGraph } from "./verticalGraph";

export default function Holdings() {
  const [allHoldings, setAllholdings] = useState([]);

  useEffect(() => {
    axios
      .get("https://zerodha-webpage-3.onrender.com/allHoldings", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setAllholdings(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.cost</th>
            <th>LPT</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const currVal = stock.price * stock.qty;
            const isProfit = currVal - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{currVal.toFixed(2)}</td>
                <td className={profClass}>
                  {(currVal - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875 <span>55</span>
          </h5>{" "}
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>1,553 (+5.20)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data}></VerticalGraph>
    </>
  );
}
