import Content from "./Content"

function Course({ corse }) {

  const total = corse.parts.reduce((sum, curr) => sum += curr.exercises, 0)

  return (
    <div>
      <h1>{corse.name}</h1>
      <Content parts={corse.parts}/>
      <h2>total of {total} exercises</h2>
    </div>
  )
}

export default Course