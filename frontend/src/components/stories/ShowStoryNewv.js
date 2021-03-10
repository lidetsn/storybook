import React from 'react'
import {Link,useLocation,useHistory} from "react-router-dom"
import moment from "moment"

import classes from './showStory.module.css'
const ShowStoryNewv = (props) => {
    const path=useLocation().pathname
    // console.log(props)
     console.log(useHistory())
    console.log(useLocation())
    console.log(props)
    return (
        <div className={classes.ShowStory}>
            <div  className={`${path==="/dashboard"?" z-depth-1 ":null } ${path!=="/dashboard"? classes.Story:null}`}>
                {props.isRecent &&<span className="right-alighn grey-text">your most recent story</span>}
                <div className={classes.ContentHeader}> 
                <h6  className="right-alighn black-text" ><strong>{props.story.title}</strong> </h6>
                <span className="right-alighn grey-text">
                {moment(props.story.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </span> {props.story.status ==="public" ? <i class="fas fa-globe-americas black-text"></i>:<i class="fas fa-user-lock black-text"></i> } <br />
                </div>
                <p className={classes.P} dangerouslySetInnerHTML={{ __html: props.story.body }}/>           
            </div>
            {props.story && path!=="/dashboard" && <div className={classes.poster}>
                   <div className="card center-align">
                            <div className="card-content">
                                <span className="card-title">
                                    {props.story.user.displayName}
                                    </span>
                                <img src={props.story.user.image} className="circle responsive-img img-small"/>
                            </div>
                            <div className="card-action">
                                <Link to="/stories/user/{{story.user._id}}">
                                    More From {props.story.user.firstName}
                                    </Link>
                            </div>
                    </div>
             </div>}
        </div>
    )
}

export default ShowStoryNewv
