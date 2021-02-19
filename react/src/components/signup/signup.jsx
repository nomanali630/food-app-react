// import react from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button , Form , Nav , Navbar , FormControl ,Link} from "react-dom";
import "./signup.css"
import axios from "axios";


function Signup() {
  var url = "http://localhost:5000"
  


  function sign(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var Data = {
      name: name,
      email: email,
      phone: phone,
      password: password
    }
    axios({
      method: "post",
      url: url + "/signup",
      data: Data,
      withCredentials: true
    }).then((response) => {
      
      console.log(response.data.message)
    }).catch((error) => {
      console.log(error);
    });

  }


  return (
    <div className="main">
      <h1 className="sign">Signup</h1>
      <form onSubmit={sign}>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name" />

        </div>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />

        </div>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Phone</label>
          <input type="number" className="form-control" id="phone" aria-describedby="emailHelp" placeholder="Enter phone" />

        </div>
        <div className="form-group text-center">
          <label htmlFor="exampleInputPassword1 ">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-primary container-fluid ">Sign up</button>
      </form>
    </div>
  )

}

export default Signup;