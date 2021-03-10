import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useParams} from "react-router-dom"
import moment from "moment"
//import ReactHtmlParser from 'react-html-parser';
import {Link} from "react-router-dom"
import Loading from "../Loading/Loading"

import {showAStory} from "../../actions/storyAction"
import classes from "./showStory.module.css"


const ShowStory = (props) => {
    
       
         const {id}=useParams()
    //  console.log(useParams())      
         const dispatch=useDispatch()
         const storyDetail=useSelector(state=>state.storyDetail)
         const {aStory,storyUser,loading}=  storyDetail
         
            

      useEffect(() => {
             dispatch(showAStory(id))
            // WHEN THE COMPONENET WILL MOUNT CLEAR THE DATA
              return ()=>{
                   dispatch({type:"CLEAR"})
              }
            
         }, [id])

         
    return (
          
        <div >
            {loading ?<Loading/>:
            (<div className={classes.ShowStory}>
                <div className={props.match.path!=="/dashboard/:id"?classes.Story:null}>
                            <h5 className="grey-text">
                            {aStory.title}
                                <small>
                                {/* {{{editIcon story.user user story._id false}}} */}
                                </small>
                            </h5>
                        <div>
                                <div className="card-content">
                                    <span className="right-alighn grey-text">
                                        {moment(aStory.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                        </span><br/>
                                       <div dangerouslySetInnerHTML={{ __html: aStory.body }}/>
                                        {/* {ReactHtmlParser(aStory.body)} */}

                                        
                                </div>
                        </div>
                        
                </div>
             {props.match.path!=="/dashboard/:id" && <div className={classes.Poster}>
                        <div className="card center-align">
                            <div className="card-content">
                                <span className="card-title">
                                    {storyUser.displayName}
                                    </span>
                                <img src={storyUser.image} className="circle responsive-img img-small"/>
                            </div>
                            <div className="card-action">
                                <Link to="/stories/user/{{story.user._id}}">
                                    More From {storyUser.firstName}
                                    </Link>
                            </div>
                        </div>
                    </div> }
              </div>)}
            
         </div>
         
    )
}

export default ShowStory
