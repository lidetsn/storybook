import {combineReducers,createStore,applyMiddleware} from  'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

import {userAuthReducer,userReducer} from "./reducers/userAuthReducer"
import {userStoryReducer,storyReducer,allPostedStoriesReducer,editMyStoryReducer} from './reducers/storyReducer'

const middlewar=[thunk]
const initialState={}


const   rootStore=combineReducers({
                                   userAuth:userAuthReducer,
                                   currentUser:userReducer,
                                   userStory:userStoryReducer,
                                   storyDetail:storyReducer,
                                   allPostedStories:allPostedStoriesReducer,
                                   editMyStory:editMyStoryReducer,
                                 
                                                                    
                                })
const store=createStore(rootStore,initialState,composeWithDevTools(applyMiddleware(...middlewar)))




export default store