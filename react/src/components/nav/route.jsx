
// import react from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
   
} from "react-router-dom";

import Home from "./../home/home";
import Login from "./../login/login";
import Signup from "./../signup/signup";
import Dashboard from "./../dashboard/dashboard";




function Rout() {
    return (
        <div>
            <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
            </Switch>
            </Router>
        </div>
    )
}
export default Rout;