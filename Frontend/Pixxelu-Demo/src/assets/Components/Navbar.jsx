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
        <div className=" navContain h=[100] bg-purple-600">

         <div className="navMain  ">
           <ul>

         { 
            
            navList.map((newNav, Index)=>{
                return <li className="" key={Index}><Link to={newNav.Link}> {newNav.Name}</Link></li>
            })
         }
    
           </ul>
         </div>
    
        </div>
    
        </>
    )

}


export default Navbar