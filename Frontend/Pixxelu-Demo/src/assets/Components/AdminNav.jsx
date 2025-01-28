import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminNav() {
  const [List, setList] = useState([
    { Name: "DASHBOARD", Link: "/Dashboard" },
    { Name: "Post", Link: "/Posts" },
    { Name: "CATEGORIES", Link: "/Categories" }
  ]);

  return (
    <>
      <header>
        <div>
          <ul className="flex align-middle justify-evenly">
            {List.map((Items, index) => {
              return (
                <li className="flex align-middle justify-around" key={index}>
                  <Link to={Items.Link}>{Items.Name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </>
  );
}

export default AdminNav;
