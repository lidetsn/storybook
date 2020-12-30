const userStoryReducer=(state={story:[],isStoryLoading:true}, action)=>{
    switch(action.type){
        case "GET_STORY_SUCCESS":
                return {
                   story:action.payload,
                   isStoryLoading:false
                     
                }
          case "GET_STORY_FAILURE":
                 return {
                     error:action.payload
                 }
                 
                 
          default:
                 return state
    }
      
}


export { userStoryReducer}