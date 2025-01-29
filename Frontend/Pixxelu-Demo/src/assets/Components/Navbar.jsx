import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {

    const [navList, setnavList] = useState([
        {"Name":"HOME","Link":"/"},
        {"Name":"POSTS","Link":"/Posts"},
        {"Name":"REGISTER","Link":"/Register"},
        {"Name":"LOGIN","Link":"/Login"},
        {"Name":"USERDATA","Link":"/Userdata"},
        {"Name":"ADMIN","Link":"/Admin"},
    ])



    return (
        <>
        <div className="navContain ">

         <div className="navMain  ">
           <ul className="">
         { 
            navList.map((newNav, Index)=>{
                return <li className="flex flex-col align-middle justify-center" key={Index}><Link to={newNav.Link}> {newNav.Name}</Link><div className="chill w-full h-1 bg-neutral-50 navMain"></div></li>
            })
         }
           </ul>
         </div>
        </div>
        </>
    )
}


export default Navbar