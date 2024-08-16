import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {


  const [data, setData] = useState({})

  const handleClick = (input) => {


    axios({
      method: "GET",
      // url: "http://localhost:3000/test"
      url: `http://89.116.191.98:${input}/test`
    })
      .then(res => {
        console.log("res", res)
        setData(res.data)
      })
      
      

      .catch(err => console.log(err))
  }



  return (
    <>






      {console.log("data", data)}

      

      {/* <p>{data.msg}</p> */}
 

      <button onClick={(e) => handleClick("5000")}>server 1</button>
      <button onClick={(e) => handleClick("5100")}>server 2</button>
      

      <p>test ci cd</p>



    </>
  )
}

export default App
