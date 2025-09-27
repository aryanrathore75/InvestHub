import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Orders() {
  const [allOrders, setAllorders] = useState([]);

  useEffect(() => {
    axios.get("https://investhub.onrender.com/newOrder").then((res) => {
      console.log(res.data);
      setAllorders(res.data);
    });
  }, []);

  return (
    <>
      <h3 className="title">Your orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>QTY</th>
          </tr>

          {allOrders.map((stock, index) => {
            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.price}</td>
                <td>{stock.qty}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    </>
  );
}
