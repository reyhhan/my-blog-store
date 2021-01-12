import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const ViewBlog = ({ blog, props }) => {
  const user = useSelector(state => state.user)
  if(!blog ) {
    return null
  }
  const updateLikes = () => {
    props.likeBlog(blog.id)
  }
  const removeBlog = () => {
    try {
      if(window.confirm(`Remove blog ${blog.title}?`)){
        props.deleteBlog(blog.id)
        props.setNotification(`Removed blog '${blog.title}'`)
      }
    } catch(exception) {
      props.setNotification('Unable to remove blog')
    }
  }
  const handleComment = (event) => {
    event.preventDefault()
    const inputVal = event.target.comment.value
    event.target.comment.value = ''
    const commentObject = {
      comment: inputVal
    }
    props.commentBlog(blog.id, commentObject)
  }
  return (
    <div>
      <div>
        <h4 style={{ color : 'grey' }}>{blog.title}</h4>
        Link : <a href={blog.url}>{blog.url}</a>
        <p>Added By <b><i>{blog.author}</i></b></p>
        <p id='like'><Button variant='success' onClick={updateLikes}>{blog.likes} likes</Button></p>
        { blog.user
          ? blog.user.username===user
            ?<p><Button variant='warning' onClick={removeBlog}>remove</Button></p>
            : ''
          : ''
        }
      </div>
      <div>
        <hr />
        <h4>Comments</h4>
        <form onSubmit= {handleComment}>
          <input type="text" name="comment" />&nbsp;
          <button style={{ background : 'gray', color : 'white' }} type="submit">Add comment</button>
        </form>
        <div>
          <br />
          {blog.comments
            ? blog.comments.map(c =>
              <li key={c.id}>{c.comment}</li>)
            : ''}
        </div>
      </div>
    </div>
  )
}

export default ViewBlog