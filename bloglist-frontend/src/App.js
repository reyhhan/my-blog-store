import React, { useState, useEffect, useRef } from 'react'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import ViewBlog from './components/ViewBlog'
import LoginForm from './components/Login'
import BlogList from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import blogService from './services/blogs'
import { logout, setUser } from './reducer/userReducer'
import { likeBlog,commentBlog, deleteBlog } from './reducer/blogReducer'
import { setNotification } from './reducer/notificationReducer'
import { connect, useSelector } from 'react-redux'
import { Switch, Route, Link, Redirect, useHistory, useRouteMatch } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = ({ user, props }) => {
  const history = useHistory()

  const padding = {
    paddingRight: 5
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    props.setUser(null)
    history.push('/')
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">User</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user
              ? <span>Logged In as {user} <button onClick={handleLogout}>logout</button></span>
              : <Redirect to="/" /> }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
const App = (props) => {
  const[ author, setAuthor] = useState([])
  const blogFormRef = useRef()
  const blogList = useSelector(state => state.blog)

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getUsers()
      setAuthor(blogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      props.setUser(user.username)
    }
  }, [props])

  const user = useSelector(state => state.user)
  const match = useRouteMatch('/users/:id')

  const userBlog = match
    ? author.find(a => a.id === match.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')

  const blog= matchBlog
    ? blogList.find(b => b.id === matchBlog.params.id)
    : null

  return (
    <div className="container">

      <Notification />
      <h2>Welcome to DevBlogs</h2>
      {user !== null
        ? <div>
          <Menu user={user} props={props}/>
          <br />
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/users/:id">
              <UserBlogs userBlog={userBlog}/>
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <ViewBlog blog={blog} props={props}/>
            </Route>
            <Route path="/">
              <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              <BlogList />
            </Route>
          </Switch>
        </div>
        : <LoginForm />
      }
      <Footer />

    </div>
  )
}

const mapDispatchToProps = {
  logout,setUser,
  likeBlog,
  deleteBlog,
  setNotification,
  commentBlog
}

export default connect(
  null,
  mapDispatchToProps
)(App)