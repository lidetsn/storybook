import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link, Route, Switch } from 'react-router-dom'
import moment from "moment"

import { getUserStory, deleteStory } from "../../actions/storyAction"
import { getCurrentUser } from "../../actions/authaction"
import Modal from "../modal/Modal"
import Confermation from "../modal/confermatios/Confermation"
import classes from "./dashboard.module.css"
import ShowStory from "../stories/ShowStory"
import ShowStoryNewv from "../stories/ShowStoryNewv"
import EditStory from "../stories/EditStory"


function Dashboard(props) {

    const dispatch = useDispatch()
    const [confermed, setConfermed] = useState(false)
    const [storyIdToDelete, setStoryIdToDelete] = useState("")
    const [storyTitleToDelete, setStoryTitleToDelete] = useState("")
    const userStory = useSelector(state => state.userStory)
    const { story, isStoryLoading } = userStory
    const currentUser = useSelector(state => state.currentUser)
    const { user } = currentUser
    const [singleStory, setSingleStory] = useState("")
    const [recentPost, setRecentPost] = useState(false)
    const [editState, setEditState] = useState(false)
    const editMyStory = useSelector(state => state.editMyStory)
    const [width, setWidth] = useState(window.innerWidth);
    const { onEditState, isloading } = editMyStory

    //console.log(story)
    // console.log(isStoryLoading)
    //console.log(props)




    useEffect(() => {
        dispatch(getUserStory())
        dispatch(getCurrentUser())
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        setRecentPost(true)
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
        //   dispatch(showAStory(story[0]._id))

    }, [])

    useEffect(() => {

        getRecentStory()

    }, [userStory])

    const getRecentStory = () => {
        if (story.length > 0 && !isStoryLoading) { setSingleStory(story[0]) }

    }

    const confermDlete = (id, title) => {
        setConfermed(true)
        setStoryIdToDelete(id)
        setStoryTitleToDelete(title)
    }
    const deleteCancelled = () => {
        setConfermed(false)
        setStoryIdToDelete("")
        setStoryTitleToDelete("")
    }
    const handleDelete = (id) => {
        //  console.log("coming soon")
        dispatch(deleteStory(id))
        setConfermed(false)
        props.history.replace("/dashboard")
        //  props.history.push("/dashboard")

    }

    const showThisStory = (e) => {
        e.preventDefault()
        const s = e.target.dataset.storydetail
        setSingleStory(JSON.parse(s))
        setRecentPost(false)


    }
    return (
        <>
            <Modal show={confermed}>
                <Confermation message="ARE YOU SURE YOU WANT TO DELETE"
                    title={storyTitleToDelete}
                    type="DELETE"
                    deleteCancelled={deleteCancelled}
                    deleteConfermed={() => handleDelete(storyIdToDelete)}
                />

            </Modal>
            <div className={classes.PostedStory}>
                <div className={classes.List} >
                    <div>
                        <h5 className="grey-text ">Dashboard <i class="fas fa-book-reader"></i></h5>
                        <h5 className="grey-text ">Welcome<Link to="/profile">{user.displayName}</Link> </h5>
                    </div>
                    {isStoryLoading ? <h4>Loading</h4> : <>
                        {story.length !== 0 ?
                            (<>
                                <p className="grey-text lighten-3">Here are your stories</p>
                                <table >

                                    <tbody>
                                        {story.map(item =>
                                            <tr key={item._id}>
                                                {/* <td><Link to={`/dashboard/${item._id}`} >{item.title}</Link></td> */}
                                                <td><a href="/dashboard" onClick={showThisStory} data-storydetail={JSON.stringify(item)}>{item.title}</a><br />



                                                    <span className={classes.Info}> {moment(item.createdAt).format("MM-DD-YYYY h:mm a")}</span>     <br />
                                                    {item.status === "public" ? <i class="fas fa-globe-americas"></i> : <i class="fas fa-user-lock"></i>} <span className={classes.Info}>{item.status}</span><br />

                                                    <Link to={`/dashboard/story/edit/${item._id} `} className={`${width < 769 ? "btn" : null} ${classes.Edit}`}>
                                                        <i className="fas fa-edit"></i><span className={classes.Visiblity} onClick={() => setEditState(true)}>Edit</span>
                                                    </Link>
                                                    <Link type="submit" to="#" className={width < 769 ? "btn red" : null} onClick={() => confermDlete(item._id, item.title)}>
                                                        <i className={`${'fas fa-trash'} ${width > 769 && "red-text"}`}></i><span className={`${classes.Visiblity} ${"red-text"}`}>Delete</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </>
                            ) :
                            (<p>You have not created any stories</p>)
                        }
                    </>
                    }

                </div>
                <div className={classes.Story}>


                    {
                        (!editState || props.location.pathname === "/dashboard") && <ShowStoryNewv story={singleStory}
                            isRecent={recentPost} />
                    }
                    <Route
                        path={props.match.path + `/story/edit/:id`}
                        component={EditStory}
                    />
                </div>
            </div>
        </>

    )
}

export default Dashboard