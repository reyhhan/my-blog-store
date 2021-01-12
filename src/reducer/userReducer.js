import loginService from '../services/login'
import blogService from '../services/blogs'

export const login = (username, password, props) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOG IN',
        data: username
      })
    } catch (exception) {
      props.setNotification('Incorrect Credentials')
    }
  }
}
export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'VERIFY',
      data: user
    })
  }
}

export const logout = () => {
  return {
    type: 'LOG OUT',
    data: null
  }
}

const userReducer = (state = null , action) => {
  switch(action.type) {
  case 'LOG IN':
    state = action.data
    return state

  case 'LOG OUT':
    return action.data

  case 'VERIFY' :
    return action.data

  default :
    return state
  }
}

export default userReducer