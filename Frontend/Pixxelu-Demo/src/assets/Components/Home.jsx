import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [List, setList] = useState([])

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
        .then(res=>res.json())
        .then(json=>{
            console.log(json)
            setList(json)
        })  
    }, [])
  return (
    <>
    <ul>
     {
        List.map((Value , index)=>{
        return <li key={index}> <Link to={`/products/${Value}`}>{Value} </Link></li>
        })
     }
    </ul>
    </>
  )
}
export default Home
