import React,{useEffect} from 'react'
import {useSelector,useDispatch }from "react-redux"
import {editAStory} from "../../actions/storyAction"
import {useParams} from "react-router-dom"
import EditForm from "./EditForm"
import Loading from "../Loading/Loading"
// import {authenticateUser,getCurrentUser} from "../../actions/authaction"



const EditStory = () => {

             
              const dispatch = useDispatch()
            //   const history=useHistory()
              const editMyStory = useSelector(state => state.editMyStory)
              const{editStory,isloading}=editMyStory
            //   const currentUser=useSelector(state=>state.currentUser)
            //   const { user}= currentUser
       
                        
              const{id}=useParams()
              
            //   const [title,setTitle]=useState("")
            //   const [body,setBody]=useState("")
            //   const [status,setStatus]=useState("")
            //   const [storyFields,setStoryFields]=useState({title:"",body:"",status:""})
           
          

              useEffect(() => {
                   // dispatch(getCurrentUser())
                    dispatch(editAStory(id))
                            
                     //setStoryFields({title:editStory.title,body:editStory.body,status:editStory.status})               
                    // setTitle(editStory.title)
                    // setBody(editStory.body)
                    // setStatus(editStory.status)
                    return ()=>{
                        dispatch({type:"CLEAR_EDIT_STORY"})
                    }
                  
                     }, [])
    
 return (

        ( isloading?(<div className="container"><Loading/></div>):<EditForm preloadData={editStory}/>))
    }
                 
 export default EditStory
                  

    // return (
    //    isloading? (<div>Loading...</div>):(<div>
    //     <h3>Edit Story</h3>
    //         <div className="row">
    //             <form  className="col s12" >
    //                 {/* <input type="hidden" name="_method" value="PUT"/> */}
    //                         <div className="row">
                                
    //                             <div className="input-field">
    //                                 <input  type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    //                                 <label htmlFor="title">Title</label>
    //                             </div>
    //                         </div>

    //                 <div className="row">
                        
    //                     <div className="input-field">
    //                             <select id="status" name="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
    //                                     {/* {{#select story.status}} */}
    //                                     <option value="public">Public</option>
    //                                     <option value="private">Private</option>
    //                                     {/* {{/select}} */}
    //                             </select>
    //                             <label htmlFor="status">Status</label>
    //                     </div>
    //                 </div>

    //                 <div className="row">
    //                         <div className="input-field">
    //                             <h5>Tell Us Your Story:</h5>
    //                             <textarea id="body" name="body" value={body} onChange={(e)=>setBody(e.target.body)} />
    //                                 {/* {{story.body}} */}
                            
    //                         </div>
    //                 </div>

    //                 <div className="row">
    //                     <button type="submit" value="Save" className="btn">save</button>
    //                     <a href="/dashboard" className="btn orange">Cancel</a>
    //                 </div>
    //             </form>
    //         </div>
        
    // </div>)
        
    // )

   