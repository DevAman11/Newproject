import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom";

function Dashboard() {
  const [List, setList] = useState([
    { Name: "DASHBOARD", Link: "/Dashboard" },
    { Name: "ALLUSERS", Link: "/Users" },
    { Name: "CATEGORIES", Link: "/Categories"},
    { Name: "LOGINDATA", Link: "/LogUser"}
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


    <h1> Admin Dashboard</h1>


    </>
  )
}

export default Dashboard