import blogService from '../services/blogs'

export const newBlog = (blogObject, props) => {
  return async dispatch => {
    try{
      const blog = await blogService.create(blogObject)
      dispatch({
        type: 'CREATE',
        data: blog
      })
      props.setNotification(`Added blog '${blog.title}'`)
    } catch (exception) {
      props.setNotification('Failed to add blog')
    }
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    const blog = await blogService.getAll()
    const findBlog = blog.find(n => n.id === id)
    const content = { ...findBlog, likes: findBlog.likes + 1 }
    await blogService.update(id, content)
    dispatch({
      type: 'LIKE',
      data: content,
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    const blog = await blogService.getAll()
    const findBlog = blog.find(n => n.id === id)
    const results = await blogService.comment(id,comment)
    const object = {
      comment : results.comment,
      id : results.id
    }
    const content = { ...findBlog, comments: findBlog.comments.concat(object) }
    dispatch({
      type: 'COMMENT',
      data: content
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'REMOVE',
      data : blogs
    })
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type){
  case 'CREATE' :
    return [...state, action.data]

  case 'LIKE' :
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data)

  case 'COMMENT' :
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data)

  case 'REMOVE' :
    return action.data

  case 'INIT' :
    return action.data

  default:
    return state
  }
}

export default blogReducer