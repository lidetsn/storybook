import React,{useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {Link} from 'react-router-dom'
import moment from "moment"

import {getUserStory} from "../../actions/storyAction"
import {getCurrentUser} from "../../actions/authaction"


function Dashboard() {

        const dispatch = useDispatch()
        const userStory=useSelector(state=>state.userStory)
        const {story}=userStory
        const currentUser=useSelector(state=>state.currentUser)
        const {user}=currentUser
                

     useEffect(()=>{
              dispatch(getUserStory())
              dispatch(getCurrentUser())

         },[])

        const handleDelete=(id)=>{
            console.log("coming soon")
           // dispatch(deleteStory(id))
            
        }
       

    return (
                  
           <div className="container">
                                
                    <h5 className="grey-text lighten-3">Dashboard </h5>
                    <h5 className="grey-text lighten-3">Welcome<Link to="/profile">{user.displayName}</Link> </h5>            
                    {story.length!==0? 
                        ( <>
                        <p className="grey-text lighten-3">Here are your stories</p>
                        <table className="striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr> 
                            </thead>
                            <tbody>
                                {story.map(item=>
                                <tr key={item._id}>
                                    <td><Link to={`/showstory/${item._id}`}>{item.title }</Link></td>

                                    {/* <td><Link to={{ pathname:"/showstory",
                                                    state:{id:item._id} }}
                                                >
                                            {item.title }
                                            </Link></td> */}

                                    <td className="grey-text lighten-5">{moment(item.createdAt).format("MM-DD-YYYY h:mm a")}</td>
                                    <td className="grey-text lighten-5"><span className="dash-status">{item.status }</span></td>                            
                                    <td>
                                        <Link to={`/story/edit/${item._id} `}className="btn btn-float">
                                            <i className="fas fa-edit"></i> EDIT
                                        </Link>                                  
                                        <button type="submit" className="btn red" onClick={()=>handleDelete(item._id)}>
                                                <i className="fas fa-trash"></i>DELETE
                                        </button>
                                    </td>
                                </tr>
                                )}

                            </tbody>
                        </table>
                        </>
                    ):
                    ( <p>You have not created any stories</p>)
                    }               
        </div>
        
        )
}

export default Dashboard