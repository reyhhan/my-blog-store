import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer, { initializeBlogs } from './reducer/blogReducer'
import notificationReducer from './reducer/notificationReducer'
import blogService from './services/blogs'
import userReducer from './reducer/userReducer'

const reducer = combineReducers({
  blog : blogReducer,
  notification : notificationReducer,
  user: userReducer
})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ))

blogService.getAll().then(blogs =>
  store.dispatch(initializeBlogs(blogs))
)

export default store
