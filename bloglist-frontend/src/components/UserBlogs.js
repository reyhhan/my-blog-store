import React from 'react'
import { Table } from 'react-bootstrap'

const UserBlogs = ({ userBlog }) => {
  if(!userBlog) {
    return null
  }

  return (
    <div>
      <h4><i>{`${userBlog.name}'s blogs`}</i></h4>
      <Table>
        <tbody>
          {userBlog.blogs.map(b =>
            <tr key={b.id}>
              <td>
                {b.title}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <br />
    </div>
  )
}

export default UserBlogs