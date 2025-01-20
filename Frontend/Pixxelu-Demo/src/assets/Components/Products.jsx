import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Products() {
   const {id} = useParams()
      
   const [productList, setproductList] = useState([])

   useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${id}`)
    .then(res=>res.json())
    .then(json=>{console.log(json)
      setproductList(json)})
   },[])
  return (
  <>
   {/* {
    productList.map((item,index)=>{
      return <img src={item.image} key={index} width={100} height={100} />
    })
   } */}
  </>
  )
}

export default Products