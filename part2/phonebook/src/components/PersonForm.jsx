import React from 'react'

function PersonForm({ handleSubmit, handleSetName, handleSetNumber }) {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" onChange={(e) => handleSetName(e)}/>
        </div>
        <div>
          number: <input type="text" onChange={(e) => handleSetNumber(e)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm