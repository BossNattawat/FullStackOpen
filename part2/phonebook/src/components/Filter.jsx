import React from 'react'

function Filter({ handleSetFilter }) {
  return (
    <div>
        filter shown with <input type="text" onChange={(e) => handleSetFilter(e)}/>
      </div>
  )
}

export default Filter