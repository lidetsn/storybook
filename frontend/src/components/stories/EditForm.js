import React,{useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {Link,useHistory} from "react-router-dom"

import 'materialize-css';
import {Select,TextInput} from 'react-materialize';
// import {useForm} from "react-hook-form"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {updateAStory} from "../../actions/storyAction"
import Modal from "../modal/Modal"
import Confermation from "../modal/confermatios/Confermation"
import {getUserStory} from "../../actions/storyAction"
import classes from "./showStory.module.css"




function EditForm({preloadData}) {
    
 //   const {preloadData}=props
 let history=useHistory()
            // const data={
            //         title:preloadData.title,
            //         body:preloadData.body,
            //         status:preloadData.status
            //       }
           const [formFields,setFormfileds]=useState({title:preloadData.title,body:preloadData.body,status:preloadData.status})
           const [changed,setChanged]=useState(false)
           const[editConfermed,setEditConfermed]=useState(false)
            //   const {register,handleSubmit}=useForm({
            //            defaultValues:data
            //   })
            const userStory=useSelector(state=>state.userStory)
        const {story, isStoryLoading}=userStory
            const dispatch = useDispatch()

            // console.log("preload data")
            // console.log(preloadData)
            // console.log(data)
            

            // const onSubmit=(data)=>{
            //     dispatch(updateAStory({_id:preloadData._id,data}))
            //         console.log("form data")
            //         console.log(data)
            // }
            const handleSubmit=(e)=>{
                  e.preventDefault()
                //   console.log("=========")
                //   console.log(formFields)
                if(changed){
                  dispatch(updateAStory({_id:preloadData._id,formFields}))
                //  history.push("/dashboard")
                
                  setEditConfermed(true)
                }
                else{
                    setEditConfermed(true)
                }
                //   alert("your story has updated successfully")
                //   history.push("/dashboard")
                
            }
            const confermed=()=>{
                dispatch(getUserStory())
               history.push("/dashboard")

            }
            const handleChange=(e)=>{
                setChanged(true)
                  setFormfileds({...formFields,[e.target.name]:e.target.value})

    }
            const handleEditorChange=(event,editor)=>{
                     setChanged(true)
           const edata = editor.getData();       
               setFormfileds({...formFields,body:edata})
            }
 
    return (
        <>
            <Modal show={editConfermed}>
                {changed?   <Confermation confermed={confermed}
                                    message="your change has been made successfully"/>:
                             <Confermation confermed={confermed}
                                    message="you have not made any change on the story"/>}
            
            </Modal>
        <div>
            <h5 className={classes.Header}>Edit Story</h5>
                <div>
                    {/* <form  className="col s12" onSubmit={handleSubmit(onSubmit)}> */}
                    <form>

                        {/* <input type="hidden" name="_method" value="PUT"/> */}
                                
                                    
                                    <div>
                                        {/* <input ref={register} type="text" id="title" name="title" /> */}
                                        <input label="Title"  type="text" id="title" name="title" value={formFields.title} onChange={handleChange}/>

                                    </div>
                                

                        
                            
                            <div className="input-field">
                                    {/* <select ref={register}id="status" name="status" value={status} > */}
                                    <Select id="status" 
                                            name="status" 
                                            value={formFields.status}
                                             onChange={handleChange} 
                                             label="Status">

                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                            {/* {{/select}} */}
                                    </Select>
                            
                        </div>

                        <br/><br/>
                                <div className="input-field">
                                    <h5>Tell Us Your Story:</h5>
                                    {/* <textarea ref={register} id="body" name="body" /> */}
                                    {/* <textarea  id="body" name="body" value={formFields.body} onChange={handleChange}/> */}
                                    <CKEditor
                                            editor={ ClassicEditor } 
                                            onReady={ editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log( 'Editor is ready to use!', editor );
                                                } }
                                                data={formFields.body}
                                                onChange={handleEditorChange }
                                      
                                      />
                                </div>
                        

                        <div >
                            {/* <input type="submit" value="Save" className="btn"/> */}
                            <button  value="Save" className="btn" onClick={handleSubmit}>save</button>

                            <Link to="/dashboard" className="btn orange">Cancel</Link>
                        </div>
                    </form>
            
                </div>
            
        </div>
        </>
    )
    
}

export default EditForm
