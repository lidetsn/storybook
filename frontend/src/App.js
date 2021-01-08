
import './App.css';

import React from "react"
import {BrowserRouter as Route,Switch}from "react-router-dom"


import Login from "./components/login/Login"
import Dashboard from "./components/dashboard/Dashboard"
import PageNotFound from "./components/pageNotFound/PageNotFound"
import PrivateRoute from "./components/privateRoute/PrivateRoute"
import PublicRoute from "./components/publicRoutes/PublicRoute"
import Profile from "./components/profile/profile"
import AddStory from "./components/stories/AddStory"
import ShowStory from "./components/stories/ShowStory"
import PostedStories from "./components/stories/PostedStories"
import EditStory from "./components/stories/EditStory"



function App() {
      
  return (

              <Switch>
                    <PublicRoute exact path="/" component={Login} />                                     
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />   
                    <PrivateRoute path="/showstory/:id/:uid" component={ShowStory} />
                    <PrivateRoute path="/story/edit/:id" component={EditStory}/ >               
                    <PrivateRoute path="/publicstories" component={PostedStories}/>                 
                    <PrivateRoute path="/addstory"exact component={AddStory}/>              
                    <PrivateRoute path="/profile"exact component={Profile}/>
                    <Route path="*"  component={PageNotFound}/>
                    
                             
              </Switch>

            //   {/* <div><Footer/></div> */}

      
    
  );
}

export default App;
