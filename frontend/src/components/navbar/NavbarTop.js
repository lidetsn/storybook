import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link} from "react-router-dom"
import { getCurrentUser } from "../../actions/authaction"
import classes from './navbar.module.css'
import {Navbar} from 'react-materialize'
import DrawerToggle from './/DrawerToggle/DrawerToggle';


const NavbarTop = () => {


  const dispatch = useDispatch()
  // const userAuth=useSelector(state=>state.userAuth)
  // const { isUserAutenticated}=userAuth
  const currentUser = useSelector(state => state.currentUser)
  const { user } = currentUser
  const [width, setWidth] =useState(window.innerWidth);
  //for debuging purpose
  //console.log("is user autenticated from navbar")
  //console.log(isUserAutenticated)


  useEffect(() => {
    dispatch(getCurrentUser())
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
  
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [])


  const authLinks = (
    <ul className={classes.Sidenav} >
      <li >
        {/* <NavItem > */}
          <Link to="/dashboard">Dashboard</Link>        
        {/* </NavItem> */}
      </li>
      <li >
        {/* <NavItem > */}
          <Link to="/publicstories">Public Stories</Link>
          
        {/* </NavItem> */}
      </li>
      <li >
        {/* <NavItem > */}
        <Link to="/addstory">Add story</Link> 
        {/* </NavItem> */}
      </li>
      <li >
        {/* <NavItem > */}
        <Link to="/profile"> Profile</Link>
        {/* </NavItem> */}
      </li>
     
          <li>
          <Link to="/api/logout">
          Logout
          </Link>
          </li>
          <li >
        {/* <NavItem > */}
          
          <img         
            src={user.image}
            className={classes.ProfileImage}
            
          /> </li>
          
        {/* </NavItem> */}
     
    </ul>
  );

  
  // upto here
  return (
    <Navbar
    alignLinks="right"
    brand={<Link   to="/dashboard"><span className={classes.Home}>FaceStory</span></Link>}
    id="mobile-nav"
    menuIcon={<DrawerToggle/>}
    options={{
      draggable: true,
      edge: 'left',
      inDuration: 250,
      onCloseEnd: null,
      onCloseStart: null,
      onOpenEnd: null,
      onOpenStart: null,
      outDuration: 200,
      preventScrolling: true,
      
    }}
  >
   
    {user?authLinks:null}
  </Navbar>

  );
}


export default NavbarTop
