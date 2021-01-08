import React from 'react'
import "./login.css"


function Login() {
    return (
  <div className="landing">
  <div className="dark-overlay landing-inner text-light">
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
             <h1 className="display-3 mb-4">FaceStory</h1>
             <p className="lead">
                 Create an account and share your story with others.
              </p>
              <hr />
              <div className="google-btn-container">
                    {/* <a href="/auth/google"> */}
                <div className="google-btn"  onClick={() => window.location ="auth/google"} >
                  <div className="google-icon-wrapper">
                      <img
                        className="google-icon"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="signin"
                        
                      />
                   </div>
                   <p className="btn-text">
                      <b>Log in with Google</b>
                   </p>
                  </div>
                   {/* </a> */}
               </div>
          </div>
       </div>
    </div>
  </div>
  </div>

    )
}

export default Login
