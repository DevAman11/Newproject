import React, { useState,useEffect } from 'react'

function LogUser() {
  const [adminData, setadminData] = useState([])
  
    const logindata = async () => {
        await fetch("http://localhost:9000/viewLogin")
          .then((res) => res.json())
          .then((json) => {
            setadminData(json);
            console.log(json);
          })
          .catch((err) => console.log(err));
      };
      useEffect(() => {
        logindata();
      }, []);
  return (
    <>
    
    <div class="bg-gray-50 min-h-screen">
      
      <div>
        <div class="p-4">
          <div class="bg-white p-4 rounded-md">
            <div>
              <h2 class="mb-2 text-3xl font-bold text-gray-700 text-center" >Admin</h2>
              <div>
                <div>
                  <div class="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                    <div>
                      <span>ID</span>
                    </div>
                    <div>
                      <span>Email</span>
                    </div>
                    <div>
                      <span>Password</span>
                    </div>
                    <div>
                      <span>Edit</span>
                    </div>
                  </div>
                  <div>
    
                   { adminData.map((Item,index)=> {
                    return (
                  
                    <div  key={index}  class="flex justify-between border-t text-base font-normal mt-4 space-x-4">
                      <div>
                        <span>{Item.ID}</span>
                      </div>
                      <div class="px-2">
                        <span>{Item.Email}</span>
                      </div>
                      <div class="px-2">
                        <span>{Item.Password}</span>
                      </div>
                      <div class="px-2">
                        <select>
                          <option>Admin</option>
                          <option>User</option>
                        </select>
                      </div>
                    </div>
                  )
                })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default LogUser