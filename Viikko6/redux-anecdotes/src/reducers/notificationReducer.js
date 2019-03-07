
const notificationReducer = (state = null, action) => {
    //console.log('state now: ', state)
    //console.log('action', action)
    switch(action.type) { 
      case 'SET_NOTIFICATION' :
        return action.notification
      default:
        return state
  }
}

export const changeNotification = (notification, time) => {
  //console.log('notifyreducerin saama notification', notification)
  return async dispatch => {
    await
    dispatch ({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch ({
        type: 'SET_NOTIFICATION',
        notification: null
      })
    }, time*1000) 
  } 
}
 
export default notificationReducer