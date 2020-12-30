
//reducer to get a user story
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
//reducer to get the story to edit form
const editMyStoryReducer=(state={editStory:{},isloading:true}, action)=>{
    switch(action.type){
        case "EDIT_A_STORY_SUCCESS":
                return {
                   editStory:action.payload,
                   isloading:false//i added this to controle preload of the form 
                
                     
                }
          case "EDIT_A_STORY_FAILURE":
                 return {
                     error:action.payload
                 }
          case "CLEAR_EDIT_STORY":
              return{
                   editStory:{},
                   isloading:true
              }
                 
          default:
                 return state
    }
      
}
//reducer to get all public stories
const allPostedStoriesReducer=(state={postedStories:[],loading:true}, action)=>{
    switch(action.type){
        case "GET_ALL_POSTED_STORY_SUCCESS":
                return {
                   postedStories:action.payload,
                   loading:false
                     
                }
          case "GET_ALL_POSTED_STORY_FAILURE":
                 return {
                     error:action.payload
                 }
                 
                 
          default:
                 return state
    }
      
}
//reducer for story detail
const storyReducer=(state={aStory:{},storyUser:{},loading:true}, action)=>{
    switch(action.type){
        case "SHOW_A_STORY_SUCCESS":
                return {
                   aStory:action.payload.story,
                   storyUser:action.payload.user,
                   loading:false
                     
                }
          case "SHOW_A_STORY_FAILURE":
                 return {
                     error:action.payload
                 }
            case "CLEAR":
                return {
                    aStory:{},
                    storyUser:{},
                    loading:true
                } 
                 
          default:
                 return state
    }
      
}


export { userStoryReducer,storyReducer,allPostedStoriesReducer,editMyStoryReducer}


