import axios from "axios"


const getUserStory= ()=>async (dispatch)=>{
            try {
                  const result =await axios.get("api/stories/userStory")
                  const  {data}=result

                  // console.log("out put from story action")
                  // console.log(result)
                  // console.log(data)
                  // the data send from the server made to include {posts and is authenticated}
                  dispatch({type:"GET_STORY_SUCCESS",payload:data})  
                       
                        
            } catch (error) {
                          dispatch({type:"GET_STORY_FAILURE",payload:"server error"})
                
            }
}
export {getUserStory}