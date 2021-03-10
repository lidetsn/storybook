import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"

import { truncate,stripTags } from "../../helpers/helper"
import Loading from "../Loading/Loading"
import { getAllPostedStories } from "../../actions/storyAction"
import classes from "./showStory.module.css"

import ShowStoryNewv from "./ShowStoryNewv"



const PostedStories=(props) =>{

            const dispatch = useDispatch()
            const allPostedStories = useSelector(state => state.allPostedStories)
            const { postedStories, loading } = allPostedStories
            // responsiveness
            const [width, setWidth] =useState(window.innerWidth);
            const storyDetail=useSelector(state=>state.storyDetail)
            const {aStory,storyUser}=  storyDetail
            const [selectedStory,setSelectedStory]=useState("")

  


            useEffect(() => {
                            dispatch(getAllPostedStories())
                            const handleWindowResize = () => setWidth(window.innerWidth)
                            window.addEventListener("resize", handleWindowResize);
                          
                            // Return a function from the effect that removes the event listener
                            return () => window.removeEventListener("resize", handleWindowResize);

                        }, [])

                useEffect(() => {
                          
                            getRecentStory()

                        }, [postedStories])

            const getRecentStory=()=>{
                if(postedStories.length>0 && !loading)
               {setSelectedStory(postedStories[0])}
              
            }

            const getUserStory=(id,uid,story)=>{
         
                    if(width>639){
                            // props.history.replace(`/publicstories/showstory/${id}/${uid}`);
                            setSelectedStory(story)
                    }
                   else{
         
                       let readMore=document.getElementById(id).getAttribute("show")
                       if(readMore==="false"){
                           const newLink=    document.createElement('a')
                           newLink.setAttribute("href",`#${id}`)
                           const newContent = document.createTextNode("RED LESS");
                           newLink.appendChild(newContent)
                           document.getElementById(id).innerHTML=story.body
                           document.getElementById(id).appendChild(newLink)

                           document.getElementById(id).setAttribute("show","true")
                          }
                       else{
                        const newLink=    document.createElement('a')
                        newLink.setAttribute("href",`#${id}`)
                        const newContent = document.createTextNode("RED MORE");
                        newLink.appendChild(newContent)
                        document.getElementById(id).innerHTML= stripTags(truncate(story.body, 150))
                        document.getElementById(id).appendChild(newLink)

                     
                           document.getElementById(id).setAttribute("show","false")
                           }
                     }
               }
    
    
    return (
        <div> {loading ? <Loading /> :
        
         <div className={classes.PostedStory}>
             
               <div className={classes.List} >
                 
                        {postedStories.length !== 0 ? <>
                            <h4 className="grey-text lighten-3">Stories</h4>
                            {postedStories.map(story => 
                                (<div key={story._id} className="left-align z-depth-1 ">
                                     {/* <div className="card-image"> */}
                                         {/* bring the current user */}
                                         {/* {editIcon(story.user,currentUser,story._id)} */}
                                         <h6 className={classes.PostedDate}>posted:{moment(story.createdAt).format("MM-DD-YYYY h:mm a")}</h6>
                                     {/* </div> */}
                                    <div >
                                        <h6 className={aStory._id===story._id?classes.Active:null} >{story.title}</h6>
                                        <div className={width<639?classes.List:null} onClick={()=>getUserStory(story._id,story.user._id,story)}>
                                              {<p name={story._id} id={story._id}  show="false" >
                                                   { stripTags(truncate(story.body, 150))}  <a href={`#${story._id}`} >RED MORE</a>  
                                              </p>}  
                                       </div>
                                         
                                        <div className="chip">
                                            <img src={story.user.image} alt="" />
                                            <a href="/stories/user/{{user._id}}">{story.user.displayName}</a>
                                        </div>
                                    </div>
                                
                            </div>)
                           )}
                     </> :
                       <h4>No stories to display</h4>
                    }

             </div>
             {/* for large device only */}
                  {width>639 && <div className={classes.Story}>
                                   
                    
                         <ShowStoryNewv story={selectedStory}/>
                </div>}
        </div>}
        </div>
    )
}

export default PostedStories
