// import react from "react";

import Nav from "../nav/nav"
import axios from 'axios'
import {useGlobalState} from '../../context/globalContext'
function Dashboard() {
  const  GlobalState= useGlobalState()

  function logout() {
    axios({
      methid: "post",
      url: 'http://localhost:5000/logout',
    }).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
    return false
  }

  return (
    <div logout={logout}>
      <h1>Dashboard</h1>
      <h1>{GlobalState.user.name}</h1>
    </div>
  )

}

export default Dashboard;