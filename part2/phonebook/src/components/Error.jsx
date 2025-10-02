
function Error({ message }) {

  const error = {
    color: "white",
    backgroundColor: "red",
    border: "1px solid red",
    padding: "10px",
    marginBottom: "10px"
  }

  return (
    <div style={error}>{message}</div>
  )
}

export default Error