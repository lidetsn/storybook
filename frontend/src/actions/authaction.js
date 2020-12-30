import axios from "axios"



const authenticateUser= ()=>async (dispatch)=>{
  
    try {
          const result =await axios.get("http://localhost:3000/auth/users/user")
          const  {data}=result

          // console.log("out put from user action")
          // console.log(result)
          // console.log(data)
          // the data send from the server made to send  "is authenticated" false or true}
         dispatch({type:"USER_AUTHENTICATED_SUCCESS",payload:data.isAutenticated})  
               
                
    } catch (error) {
                  dispatch({type:"USER_AUTHORIZED_FAILURE",payload:"server error"})
        
    }
    
}

 const getCurrentUser = () => dispatch => {
    axios
        .get("/api/current_user")
         .then(res => {
          //this.setState({ profile: res.data });
          // console.log(res.data);
          dispatch({
                type:"GET_CURRENT_USER",
                payload: res.data
            });
        })
        .catch(err => {
          console.log(err.response);
        });
};


export { authenticateUser,getCurrentUser}