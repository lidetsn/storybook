
import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Link,useHistory} from "react-router-dom"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import 'materialize-css';
import { Button,Select} from 'react-materialize';
import {addStory} from "../../actions/storyAction"
import {getCurrentUser} from "../../actions/authaction"
import Modal from "../modal/Modal"
import Confermation from "../modal/confermatios/Confermation"

import { getUserStory } from "../../actions/storyAction"
//import { getCurrentUser } from "../../actions/authaction"



const AddStory = () => {
       const [formFields,setFormFields]=useState({title:"",body:"", status:"public"})
       const [error, setError]=useState(false)
       const [addconfermed,setAddConfermed]=useState(false)
       const dispatch=useDispatch()
       const history=useHistory()


    //    useEffect(() => {
    //     dispatch(getUserStory())
    //     dispatch(getCurrentUser())
    //     //   dispatch(showAStory(story[0]._id))


    // }, [])
    
        const handleChange=(e)=>{

            setFormFields({...formFields,[e.target.name]:e.target.value})
            
        }
        const handleEditorChange=(event,editor)=>{

            const data = editor.getData();
            
            
            setFormFields({...formFields,body:data})
        }
        const handleSubmit=(e)=>{
            
                e.preventDefault()
             if(formFields.title !=="" && formFields.body !=="" && formFields.status !==""){
         
                dispatch(addStory(formFields))
                setAddConfermed(true)
               
            }
            else{
                setError(true)
            }
            
        }
const confermed=()=>{
                history.push("/dashboard")

             
}
        
    useEffect(()=>{
              dispatch(getCurrentUser())

    },[])

    return (
        <>
        <Modal show={addconfermed}>
             <Confermation confermed={confermed}
                                     message="YOUR POST HAS BEEN SUCCESSFULY POSTED"/>
             
        </Modal>
     <div className="container">
               <h3>Add Story</h3>
               {error &&<div class="card-panel">
                         <span class="red-text text-darken-2">*** Fill out all fields</span>
                        </div>}

            <div className="row">

                <form  className="col s12">
                        <div className="row">
                            <div className="input-field">
                                <input type="text" id="title" name="title" value={formFields.title} onChange={handleChange}/>
                                <label htmlFor="title">Title</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field">
                                <Select id="status" 
                                        name="status" 
                                        value={formFields.status}
                                        onChange={handleChange}
                                        label="Status">

                                    <option value="public" >Public</option>
                                    <option value="private">Private</option>
                                </Select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field">
                                <h5>Tell Us Your Story:</h5>
                                {/* <Textarea  cols="25" rows="25" label="Write your story here..."id="body" name="body" value={formFields.body} onChange={handleChange}></Textarea> */}
                                <CKEditor
                                      editor={ ClassicEditor } 
                                      onReady={ editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log( 'Editor is ready to use!', editor );
                                         } }
                                    onChange={handleEditorChange }
                                      
                                      />
                            </div>
                        </div>

                    <div className="row">
                        <Button  value="Save" className="btn" onClick={handleSubmit}>Save</Button>
                        <Link to="/dashboard" className="btn orange">Cancel</Link>
                    </div>
                </form>
            </div>
            
        </div>
        </>
    )
}

export default AddStory
