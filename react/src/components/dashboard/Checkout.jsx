import React from 'react'
import axios from 'axios'
import{useGlobalState,useGlobalStateUpdate} from "../../context/globalContext"
function Checkout(){
   var GlobalState = useGlobalStateUpdate()
   function order(){
     axios({
       method:"post",
       url:"http://localhost:5000/order",
       data:{
         name:document.getElementById("name").value,
         phone:document.getElementById("phone").value,
         address:document.getElementById("address").value,
         orderData:GlobalState.checkoutData.cart,
         getTotalSum:GlobalState.checkoutData.getTotalSum
       },
       withCredentials:true
     }).then((res)=>{
       console.log(res)
     }).catch((error)=>{
       console.log(error)
     })
   }
  return(
    <form >
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Name</label>
      <input type="email" className="name" id="name" aria-describedby="emailHelp" placeholder="Name" required />
      
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Phone</label>
      <input type="number" className="phone" id="phone" placeholder="Phone (confirmation of order)" required />
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Address</label>
      <input type="text" className="address" id="address" placeholder="Address" required />
    </div>
    
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  )
}
export default Checkout;