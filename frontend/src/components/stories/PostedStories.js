import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import moment from "moment"
import { truncate, editIcon, stripTags } from "../../helpers/helper"
import Loading from "../Loading/Loading"
import 'materialize-css';
import { Card, Row, Col } from 'react-materialize';
import { getAllPostedStories } from "../../actions/storyAction"




function PostedStories() {

    const dispatch = useDispatch()
    const history = useHistory()
    const allPostedStories = useSelector(state => state.allPostedStories)
    const { postedStories, loading } = allPostedStories

    // console.log("======posted=========")
     console.log(postedStories)


    useEffect(() => {
        dispatch(getAllPostedStories())

    }, [])
    return (
        <div className="container">
            {loading ? <Loading /> : <>
                {postedStories.length !== 0 ? <>
                    <h4 className="grey-text lighten-3">Stories</h4>
                    {postedStories.map(story =>
                    (

                        
                            <div key={story._id} >
                                <div className="card-image">
                                    {/* bring the current user */}
                                    {/* {editIcon(story.user,currentUser,story._id)} */}
                                    <h6 className="right-align grey grey-text lighten-1">posted:{moment(story.createdAt).format("MM-DD-YYYY h:mm a")}</h6>
                                </div>
                                <div className="left-align">
                                    <h5 className="grey-text lighten-3">{story.title}</h5>
                                    {/* <p>{{stripTags (truncate body 150)}}</p> */}
                                    <p>{stripTags(truncate(story.body, 150))}<b><Link to={`/showstory/${story._id}/${story.user._id}`} >. . .read more</Link> </b></p>

                                    <br />
                                    <div className="chip">
                                        <img src={story.user.image} alt="" />
                                        <a href="/stories/user/{{user._id}}">{story.user.displayName}</a>
                                    </div>
                                </div>
                                {/* <div className="card-action left-align">
                                            <Link to={`/showstory/${story._id}`} className="btn grey">Read More</Link>
                                        </div> */}
                            </div>
                    
                    )
                    )}
                </> :
                    <h4>No stories to display</h4>
                }</>}

        </div>
    )
}

export default PostedStories
