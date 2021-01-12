import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
const Togglable = React.forwardRef((props, ref) => {
  const [blogFormVisibility, setblogFormVisibility] = useState(false)

  const hide = { display: blogFormVisibility ? 'none' : '' }
  const show = { display: blogFormVisibility ? '' : 'none' }

  const toggleVisibility = () => {
    setblogFormVisibility(!blogFormVisibility)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hide}>
        <Button variant='success' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={show}>
        {props.children}
        <Button variant='danger' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable