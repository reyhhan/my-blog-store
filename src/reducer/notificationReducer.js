export const deleteNotification =() => {
  return {
    type: 'RESET'
  }
}
export const setNotification = (content) => {
  return async dispatch => {
    dispatch({
      type : 'SET',
      data: {
        content,
      }
    })
    setTimeout(() => {
      dispatch(deleteNotification())
    },5000)
  }
}
const notificationReducer = (state ='', action) => {

  switch (action.type) {
  case 'SET':
    state= action.data.content
    return state

  case 'RESET':
    return state=''

  default:
    return state
  }
}

export default notificationReducer