import React from 'react'
import {useSelector} from "react-redux"
import { Redirect,Route } from 'react-router-dom'
import NavbarTop from "../navbar/NavbarTop"

 
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
                                          <NavbarTop/>
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
