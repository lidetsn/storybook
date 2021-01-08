import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useParams} from "react-router-dom"
import moment from "moment"
//import ReactHtmlParser from 'react-html-parser';
import {Link} from "react-router-dom"
import Loading from "../Loading/Loading"

import {showAStory} from "../../actions/storyAction"


const ShowStory = (props) => {
    
        //console.log(match)
        //const id=match.params.id     
        //console.log(props)
         const {id}=useParams()
       console.log(useParams())
        
        const dispatch=useDispatch()
        // const history=useHistory()
       // console.log("========history===========")
        // console.log(history)
        // const id=history.location.state.id
        

        const storyDetail=useSelector(state=>state.storyDetail)
         const {aStory,storyUser,loading}=  storyDetail
            //    console.log("&&&&&&&astory&&&&&&&&&&&&&&&")
            //    console.log(aStory)
            //    console.log(storyUser)
            //    console.log(id)

      useEffect(() => {
             dispatch(showAStory(id))
            // WHEN THE COMPONENET WILL MOUNT CLEAR THE DATA
              return ()=>{
                   dispatch({type:"CLEAR"})
              }
            
         }, [])

         
    return (
    
        
        <div className="container">
            {loading ?<Loading/>:
            (<div className="row">
                <div className="col s12 m8">
                            <h5 className="grey-text">
                            {aStory.title}
                                <small>
                                {/* {{{editIcon story.user user story._id false}}} */}
                                </small>
                            </h5>
                        <div className="story">
                                <div className="card-content">
                                    <span className="right-alighn grey-text">
                                        {moment(aStory.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                        </span><br/>
                                       <div dangerouslySetInnerHTML={{ __html: aStory.body }}/>
                                        {/* {ReactHtmlParser(aStory.body)} */}

                                        
                                </div>
                        </div>
                </div>
                    <div className="col s12 m4">
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
                    </div>
              </div>)}
            
         </div>
         
    )
}

export default ShowStory
