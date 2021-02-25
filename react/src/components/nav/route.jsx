
// import react from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,

} from "react-router-dom";


import Login from "./../login/login";
import Signup from "./../signup/signup";
import Dashboard from "./../dashboard/dashboard";

import { useGlobalState } from "../../context/globalContext"
import Nav from './nav'
function Rout() {
    const GlobalState = useGlobalState()
    console.log(GlobalState)
    return (
        <div>
            <Router>
            <Nav />

                {GlobalState.loginStatus === false ?
                    <div>
                        <Route exact path="/">
                            <Signup />
                        </Route>
                        <Route exact path="/signup">
                            <Signup />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </div> : null}

                {GlobalState.loginStatus === true ?
                    <div>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                        {/* <Route path="/profile">
                            <Profile />
                        </Route> */}
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </div> : null}
            </Router>
        </div>
    )
}
export default Rout;