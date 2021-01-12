import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const blogStyle = {
    color : 'black',
    fontWeight : 'bold'
  }

  return (
    <tr className='blog'>
      <td><Link style={blogStyle} to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
    </tr>
  )
}

const BlogList = (props) => {
  return (
    <div>
      <br />
      <h4 style={{ color : 'lightgray' }}>Tech Blogs</h4>
      <Table>
        <tbody>
          {props.blogs.map(blog =>
            <Blog key={blog.id}
              blog = {blog}
              props ={props}
            />
          )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs : state.blog.sort((a, b) => b.likes - a.likes)
  }
}

const Blogs = connect(
  mapStateToProps,
  null
)(BlogList)

export default Blogs
