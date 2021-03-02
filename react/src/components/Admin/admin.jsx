import axios from "axios"
import { useEffect, useState } from "react"
import "./admin.css"

function AdminDashboard() {
    var [getorder, setgetorder] = useState([])
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5000/getorder",
            withCredentials: true,
        }).then((res) => {
            console.log(res.data)
            setgetorder(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    console.log("order:", getorder)
    return (
        <div>
            <div className="container">
                <h5 className="text-center mt-5 mb-5">Customer orders</h5>
                <div className="row">
                    {getorder.map((value, index) => {
                        return (
                            <div className='col-md-5 mr-2 ml-2 mt-4 py-3 px-3' style={{ boxShadow: "0 0 10px grey" }}>
                                <div>
                                    <span>Name:</span>
                                    <span className="float-right">{value.name}</span>
                                </div>
                                <div>
                                    <span>Address:</span>
                                    <span className="float-right">{value.address}</span>
                                </div>
                                <div>
                                    <span>Phone:</span>
                                    <span className="float-right">{value.phone}</span>
                                </div><hr />
                                {value.orders.map((value, index) => {
                                    return (
                                        <div>
                                            <div>
                                                <span>Category:</span>
                                                <span className="float-right">{value.category}</span>
                                            </div>
                                            <div>
                                                <span>Name:</span>
                                                <span className="float-right">{value.name}</span>
                                            </div>
                                            <div>
                                                <span> Cost:</span>
                                                <span className="float-right">Pkr:{value.cost}</span>
                                            </div><hr />

                                        </div>
                                    )
                                })}
                                <div>
                                    <span>Total Cost:</span>
                                    <span className="float-right">Pkr:{value.total}</span>
                                </div>
                                <div className="text-center">
                                <button className='  mt-2 btn btn-primary'>Order confirm</button>
                                </div>
                            </div>

                        )

                    })}

                </div>
            </div>
        </div>
    )
}
export default AdminDashboard;