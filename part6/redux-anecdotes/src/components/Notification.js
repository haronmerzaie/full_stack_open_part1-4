import { useSelector } from 'react-redux'

const Notification = () => {
  // Fetch notification from state
  const notification = useSelector(state => state.notification)

  // Style for the notification container
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification === '' ? 'none' : ''
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification;
