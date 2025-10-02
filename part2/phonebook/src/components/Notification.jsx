
function Notification({ message }) {

  const success = {
    color: "white",
    backgroundColor: "lightgreen",
    border: "1px solid lightgreen",
    padding: "10px",
    marginBottom: "10px"
  }

  return (
    <div style={success}>{message}</div>
  )
}

export default Notification