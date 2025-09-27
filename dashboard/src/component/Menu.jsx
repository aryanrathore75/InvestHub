import { Link } from "react-router-dom";
import { useState } from "react";

export default function Menu() {
  const [element, setElement] = useState(0);

  const handleElementClick = (index) => {
    setElement(index);
  };

  const elementClass = "element";
  const activeElementClass = "element selected";

  return (
    <div className="menu-container">
      <img style={{ height: "40%" }} src="logo .png" />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to={"/"}
              onClick={() => handleElementClick(0)}
            >
              <p className={element === 0 ? activeElementClass : elementClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to={"/orders"}
              onClick={() => handleElementClick(1)}
            >
              <p className={element === 1 ? activeElementClass : elementClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to={"/holdings"}
              onClick={() => handleElementClick(2)}
            >
              <p className={element === 2 ? activeElementClass : elementClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to={"/positions"}
              onClick={() => handleElementClick(3)}
            >
              <p className={element === 3 ? activeElementClass : elementClass}>
                Positions
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile">
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>
    </div>
  );
}
