// import react from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button , Form , Nav , Navbar , FormControl ,Link} from "react-dom";
import "./login.css"


function Login (){



    return(
        <div className="main">
            <h1 className="sign">Login</h1>
             <form>
             
        
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    
        </div>
        <div className="form-group text-center">
          <label htmlFor="exampleInputPassword1 ">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        
        <button type="submit" className="btn btn-primary container-fluid">Login</button>
      </form>
        </div>
    )

}

export default Login;