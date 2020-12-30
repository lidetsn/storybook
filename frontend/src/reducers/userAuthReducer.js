

const userAuthReducer=(state={isUserAutenticated:false,isLoading:true}, action)=>{
    switch(action.type){
        case "USER_AUTHENTICATED_SUCCESS":
                return {
                
                   isUserAutenticated:action.payload,
                   isLoading:false
                     
                }
          case "USER_AUTHORIZED_FAILURE":
                 return {
                     error:action.payload
                 }
                 
                 
          default:
                 return state
    }
      
}


const userReducer=(state ={user:[]}, action) =>{
    switch (action.type) {
         case "GET_CURRENT_USER":
             return {
                    user:action.payload
                };
         default:
           return state;
}
}



export {userAuthReducer,userReducer}