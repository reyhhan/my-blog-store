import React from 'react'
import { connect } from 'react-redux'
import { newBlog } from '../reducer/blogReducer'
import { setNotification } from '../reducer/notificationReducer'
import { Button, Form } from 'react-bootstrap'

const BlogForm = (props) => {

  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    props.newBlog(blogObject, props)
  }

  return (
    <div className="formDiv">
      <h3>Create new Blog</h3>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control type="text" name='title' placeholder='Title'/>
          <Form.Label></Form.Label>
          <Form.Control type="text" name='author' placeholder='Author' />
          <Form.Label></Form.Label>
          <Form.Control type="text" name='url' placeholder='Url'/>
        </Form.Group>
        <Button type="submit">create</Button>
      </Form>
    </div>
  )
}
const mapDispatchToProps = {
  newBlog,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)