import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../actions/authaction";
import "./Profile.css";



const Profile = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const { user } = currentUser

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  return (

    <div className="container jumbotron">
      <h1 className="display-4">Howdy, {user.firstName}!</h1>
      <p className="lead">We got these details about you.</p>
      <hr className="my-4" />
      <center>
        <div className="profile-container">
          <div className="profile-item">
            <ul className="list-group">
              <li className="list-group-item">
                <div>
                  <b>Name</b>: {user.displayName}
                </div>
              </li>
              <li className="list-group-item">
                <div>
                  <b>Email</b>: {user.email}
                </div>
              </li>
            </ul>
          </div>
          <div className="profile-item">
            <img
              className="photo"
              src={user.image}
              alt=""
            />
          </div>
        </div>
      </center>
    </div>

  )
}




export default Profile
