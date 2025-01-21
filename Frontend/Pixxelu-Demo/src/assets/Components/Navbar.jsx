import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {

    const [navList, setnavList] = useState([
        {"Name":"HOME","Link":"/"},
        {"Name":"BLOG","Link":"/Blog"},
        {"Name":"CATEGORIES","Link":"/Categories"},
        {"Name":"REGISTER","Link":"/Register"},
        {"Name":"LOGIN","Link":"/Login"},
        {"Name":"USERDATA","Link":"/Userdata"},
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