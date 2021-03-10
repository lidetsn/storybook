import axios from "axios"

//action to get a user story
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
//action to get all public stories
const getAllPostedStories= ()=>async (dispatch)=>{
      try {
            const result =await axios.get("api/stories/")
            const  {data}=result

            // console.log("out put from all story action")
            // console.log(result)
            // console.log(data)

      dispatch({type:"GET_ALL_POSTED_STORY_SUCCESS",payload:data})  
            
                  
      } catch (error) {
      dispatch({type:"GET_ALL_POSTED_STORY_FAILURE",payload:"server error"})
      
      }
}
//acton to get story detail
const showAStory= (id)=>async (dispatch)=>{
      try {
      // console.log("hi there i am called")
            const result =await axios.get(`/api/stories/${id}`)
            const  {data}=result

            // console.log("out put from story action")
            // console.log(result)
            // console.log(data)
            dispatch({type:"SHOW_A_STORY_SUCCESS",payload:data})  
            
                  
      } catch (error) {
                  console.log(error)
                  dispatch({type:"SHOW_A_STORY_FAILURE",payload:"server error"})
      
      }
}
//action to get a story to edit form
const editAStory= (id)=>async (dispatch)=>{
      try {
            // console.log("hi i am called")
            const result =await axios.get(`/api/stories/edit/${id}`)
            const  {data}=result

            // console.log("out put from story action")
            // console.log(result)
            // console.log(data)
            dispatch({type:"EDIT_A_STORY_SUCCESS",payload:data})  
            
                  
      } catch (error) {
                  // console.log(error)
                  dispatch({type:"EDIT_A_STORY_FAILURE",payload:"server error"})
      
      }
}
//action to update a story
const updateAStory= (values)=>async (dispatch)=>{
// const {_id,data}=values
const {_id,formFields}=values
       
      try {
            // console.log("hi i am called")
            // console.log(values)
            var config={
                        method:"put",
                        url:`/api/stories/${_id}`,
                        headers:{
                        'Content-Type':'application/json'
                        },
                        data:formFields
                  }
                  // await axios.put(`/api/stories/${_id}`,formFields)

                  await axios(config)
      
                       //  dispatch({type:"UPDATE_A_STORY_SUCCESS",payload:true})   
                     //   dispatch( getUserStory())
            
                  
      } catch (error) {
                  console.log(error)
                  //   dispatch({type:"EDIT_A_STORY_FAILURE",payload:"server error"})
      
      }
}
//action to add new story
const addStory=(story)=> async dispatch=>{
var config = {
                  method: 'post',
                  url: '/api/stories',
                  headers: { 
                  'Content-Type': 'application/json'
                  },
                  data : story
              };

           await axios(config)

}

//delete a story
const deleteStory=(id)=>async dispatch=>{

var config = {
      method: 'delete',
      url: `/api/stories/${id}`,

    };
  
  await  axios(config)
  dispatch(getUserStory())// this call is to automatically update  the dash board withoout page refresh
    
}

export {getUserStory,addStory,showAStory,getAllPostedStories,editAStory,updateAStory,deleteStory}
