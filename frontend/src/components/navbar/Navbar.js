import React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {Link ,NavLink} from "react-router-dom"
import{getCurrentUser}from "../../actions/authaction"

const Navbar = () => {
            

        const dispatch=useDispatch()
        // const userAuth=useSelector(state=>state.userAuth)
        // const { isUserAutenticated}=userAuth
        const currentUser=useSelector(state=>state.currentUser)
        const { user}= currentUser
        //for debuging purpose
        //console.log("is user autenticated from navbar")
        //console.log(isUserAutenticated)


        useEffect(()=>{
                dispatch(getCurrentUser())
        },[])


const authLinks = (
    <ul className="navbar-nav ml-auto">
       <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard" activeStyle={{fontWeight: "bold", color: "red" }}>
        Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/publicstories" activeStyle={{fontWeight: "bold", color: "red" }}>
        Public Stories
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/addstory" activeStyle={{fontWeight: "bold", color: "red" }}>
          Add story
        </NavLink>       
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/profile" activeStyle={{fontWeight: "bold", color: "red" }}>
          Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <a href="/api/logout" className="nav-link">
          <img
            className="rounded-circle"
            src={user.image}
            // alt={user.name}
            style={{ width: "25px", marginRight: "5px" }}
            // title="You must have a Gravatar connected to your email to display an image"
          />
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      {/*<li className="nav-item">
        <a className="nav-link" href="/">
          Login with Google
        </a>
      </li>
       <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
  </li>*/}
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
         <h4> FaceStory</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                Developers
              </Link>
  </li> */}
          </ul>
          
          {/* { isUserAutenticated ? authLinks : guestLinks} */}
          { user? authLinks : guestLinks}

        </div>
      </div>
    </nav>
  );
}


export default Navbar
