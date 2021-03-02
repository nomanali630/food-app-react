import axios from "axios"
import { useEffect, useState } from "react"
import "./admin.css"

function AdminDashboard(){
    var [getorder,setgetorder] = useState([])
    useEffect(()=>{
        axios({
            method: "get",
            url:"http://localhost5000/getorder",
            withCredentials:true,
        }).then((res)=>{
            console.log(res.data.data)
            setgetorder(res.data.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    return(
        <div>
        <div className="container">
            <h5 className="col-md-5">Customer orders</h5>
        </div>
        </div>
    )
}
export default AdminDashboard