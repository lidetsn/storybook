import React from 'react'
import {useSelector} from "react-redux"
import { Redirect,Route } from 'react-router-dom'
import Navbar from "../../components/navbar/Navbar"

 
const PrivateRoute=(props)=> {
                const {component:Component,...rest}=props                      
                const userAuth=useSelector(state=>state.userAuth)
                const { isUserAutenticated,isLoading}=userAuth   

     
    return (
            !isLoading &&
                  <Route
                        {...rest}  render={props=>(
                                       isUserAutenticated? (
                                        <div>
                                          <Navbar/>
                                          <Component {...props} />
                                         </div>            
                                         ) :
                                            <Redirect to={{
                                                    pathname:"/",
                                                        state:{
                                                            from:props.location
                                        }
                              }}/>

                            )}               
                />
            
        
           )
}

export default PrivateRoute
