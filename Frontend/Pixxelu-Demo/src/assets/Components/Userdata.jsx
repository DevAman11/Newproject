import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";

function Userdata() {
  const [data, setData] = useState([]);

  const alldata = async () => {
    await fetch("http://localhost:9000/View")
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        console.log(json)
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    alldata();
  }, []);


  const deleteUser = async (id) =>{
    try {
      const response = await fetch(`http://localhost:9000/Delete/${id}`,{
      method: 'DELETE',
      headers:{
        "Content-Type" :"application/json"
      },
     
      })
      if(!response.ok){
        window.location.reload(Userdata)
       alert("Single Data Delete Successfully")
      }
      
    } catch (error) {
      console.log("User Not Found");
    }

  }
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <link
        rel="stylesheet"
        href="https://cdn.tailgrids.com/tailgrids-fallback.css"
      />
      <script
        defer
        src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
      ></script>

<<<<<<< Updated upstream
      <section class="">
        <div class="container ">
          <div class="flex flex-wrap -mx-24">
            <div class="w-full px-4 py-2">
              <div class="max-w-full overflow-x-auto">
                <table class="table-auto w-full">
=======
      <section className="">
        <div className="container">
          <div className="flex flex-wrap -mx-12">
            <div className="w-full px-4">
              <div className="max-w-full overflow-x-auto">
                <table className="table-auto w-full">
>>>>>>> Stashed changes
                  <thead>
                    <tr className="bg-primary text-center">
                      <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-l border-transparent
                           "
                      >
                        ID
                      </th>
                      <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                      >
                       Firstname
                      </th>
                      <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                      >
                 Lastname
                      </th>
                      <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                      >
                        Username
                      </th>
                      <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                      >
                        Email
                      </th>
                      <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           "
                      >
                        Password
                      </th>
<<<<<<< Updated upstream
                      
=======
                      <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           "
                      >
                        Action
                      </th>
>>>>>>> Stashed changes
                    </tr>
                  </thead>
                  <tbody>

                  {data.length>0 && data.map((item,index)=>{

                    return(
                    <tr key={index}>
                      <td
                        className="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-l border-[#E8E8E8]
                           "
                      >
                        {index+1}
                      </td>
                      <td
                        className="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                      >
                        {item.Firstname}
                      </td>
                      <td
                        className="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                      >
                        {item.Lastname}

                      </td>
                      <td
                        className="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                      >
                     {item.Username}
                      </td>
                      <td
                        className="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                      >
                        {item.Email}
                      </td>
                      <td
                        className="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                      >
                        {item.Password}
                      </td>
<<<<<<< Updated upstream
                     
=======
                      <td
                        className="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-r border-[#E8E8E8]" >
                     <button>
                        <Link
                          to={`/Update/${item.ID}`}
                          className="
                              border border-green-6000
                              py-2
                              px-8
                              text-primary
                              inline-block
                              rounded
                              hover:bg-green-600 hover:text-white
                              " >  Edit </Link> </button>


                        <button 
                        onClick={()=>deleteUser(item.ID)}
                         className=" border border-red-600 py-2 px-6 text-primary inline-block rounded hover:bg-red-600 hover:text-white "> Delete
                        </button>

                      </td>
>>>>>>> Stashed changes
                    </tr>
                    )
                  })}
                  
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Userdata;
