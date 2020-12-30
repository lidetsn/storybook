
import './App.css';
import React from "react"
import {BrowserRouter as Route,Switch}from "react-router-dom"


import Login from "./component/login/Login"
import Dashboard from "./component/dashboard/Dashboard"
import PageNotFound from "./component/pageNotFound/PageNotFound"
import PrivateRoute from "./component/privateRoute/PrivateRoute"
import PublicRoute from "./component/publicRoutes/PublicRoute"



function App() {
      
  return (

              <Switch>
                    <PublicRoute exact path="/" component={Login} />                                     
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />                                               
                    <Route path="*"  component={PageNotFound}/>
              </Switch>

            //   {/* <div><Footer/></div> */}

      
    
  );
}

export default App;
