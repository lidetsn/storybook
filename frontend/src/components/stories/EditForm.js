import React,{useState} from 'react'
import {useDispatch} from "react-redux"
import {Link,useHistory} from "react-router-dom"

import 'materialize-css';
import {Select,TextInput} from 'react-materialize';
// import {useForm} from "react-hook-form"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {updateAStory} from "../../actions/storyAction"




function EditForm({preloadData}) {
    
 //   const {preloadData}=props
 let history=useHistory()
            // const data={
            //         title:preloadData.title,
            //         body:preloadData.body,
            //         status:preloadData.status
            //       }
           const [formFields,setFormfileds]=useState({title:preloadData.title,body:preloadData.body,status:preloadData.status})

            //   const {register,handleSubmit}=useForm({
            //            defaultValues:data
            //   })
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
                  dispatch(updateAStory({_id:preloadData._id,formFields}))
                  alert("your story has updated successfully")
                  history.push("/dashboard")
                
            }
            const handleChange=(e)=>{
                  setFormfileds({...formFields,[e.target.name]:e.target.value})

    }
            const handleEditorChange=(event,editor)=>{

           const edata = editor.getData();       
               setFormfileds({...formFields,body:edata})
            }
 
    return (
        <div className="container">
            <h3>Edit Story</h3>
                <div className="row">
                    {/* <form  className="col s12" onSubmit={handleSubmit(onSubmit)}> */}
                    <form  className="col s12" >

                        {/* <input type="hidden" name="_method" value="PUT"/> */}
                                <div className="row">
                                    
                                    <div className="input-field">
                                        {/* <input ref={register} type="text" id="title" name="title" /> */}
                                        <TextInput label="Title"  type="text" id="title" name="title" value={formFields.title} onChange={handleChange}/>

                                    </div>
                                </div>

                        <div className="row">
                            
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
                        </div>

                        <div className="row">
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
                        </div>

                        <div className="row">
                            {/* <input type="submit" value="Save" className="btn"/> */}
                            <button  value="Save" className="btn" onClick={handleSubmit}>save</button>

                            <Link to="/dashboard" className="btn orange">Cancel</Link>
                        </div>
                    </form>
            
                </div>
            
        </div>
    )
    
}

export default EditForm
