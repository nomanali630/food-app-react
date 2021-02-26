// import react from "react";
import { Link } from "react-router-dom"
import Logout from '../logout/logout'

import {useGlobalState } from "../../context/globalContext"

function Nav() {
  const GlobaleState = useGlobalState()
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <a className="navbar-brand" href="#">Menu</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {(GlobaleState.loginStatus === true) ?
            <div>
              <ul className="navbar-nav mr-auto">
                {/* <li className="nav-item active">
                  <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/">Dashboard</Link>
                </li> */}
                <li className="nav-item float-right" >
                  <Link className="nav-link" to="/login"><Logout /></Link>
                </li>

              </ul>
              
            </div> :
            <div>
              <form className="form-inline my-2 my-lg-0 "  >
                <button className="btn btn-outline-success my-2 my-sm-0 " type="submit">
                  <Link className="nav-link" to="/login">Login<span className="sr-only">(current)</span></Link>
                </button>
                <button className="btn btn-outline-success my-2 my-sm-0 ml-3" type="submit">
                  <Link className="nav-link" to="/signup">Signup <span className="sr-only">(current)</span></Link>
                </button>
                
              </form>
            </div>
          }
        </div>
      </nav>
    </div>
  )

}

export default Nav;
