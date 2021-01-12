import React from 'react'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const[auth, setAuthors] = useState([])
  const linkStyle = {
    color : 'blue',
    fontWeight : 'bold'
  }
  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getUsers()
      setAuthors(blogs)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h4 style={{ color : 'lightgray' }}>Users</h4>
      <Table>
        <tbody>
          <tr>
            <th>Author</th>
            <th>No. of blogs</th>
          </tr>
          {
            auth.map(v =>
              <tr key={v.id}>
                <td><Link style={linkStyle} to={`/users/${v.id}`}>{v.name}</Link></td>
                <td><b>{v.blogs.length}</b></td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Users