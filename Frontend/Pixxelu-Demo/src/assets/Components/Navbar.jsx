import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {

    const [navList, setnavList] = useState([
        {"Name":"Home","Link":"/"},
        {"Name":"Blog","Link":"/Blog"},
        {"Name":"Categories","Link":"/Categories"},
        {"Name":"Register","Link":"/Register"},
        {"Name":"Login","Link":"/Login"},
        {"Name":"Userdata","Link":"/Userdata"},
    ])



    return (
        <>
        <div className="navContain ">

         <div className="navMain  ">
           <ul className="">
         { 
            navList.map((newNav, Index)=>{
                return <li className="flex align-middle justify-around" key={Index}><Link to={newNav.Link}> {newNav.Name}</Link></li>
            })
         }
           </ul>
         </div>
        </div>
        </>
    )
}


export default Navbar