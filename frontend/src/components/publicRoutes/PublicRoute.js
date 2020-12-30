import React  from 'react'
import {useSelector} from "react-redux"
import { Redirect,Route } from 'react-router-dom'

 
const PublicRoute=(props)=> {
               const {component:Component,...rest}=props
               const userAuth=useSelector(state=>state.userAuth)
               const { isUserAutenticated}=userAuth   
    
    return (
    
            <Route {...rest} component={(props) => (
                            isUserAutenticated ? (
                                    <Redirect to="/dashboard" />           
                                    ): (
                                <Component {...props} />
                            )
            )} />
            
        
    )
}

export default PublicRoute