
function Header({ course }) {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

function Part({part, exercise}) {
  return (
    <>
      <p>
        {part} {exercise}
      </p>
    </>
  )
}

function Content({parts}) {

  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} part={part.name} exercise={part.exercises}/>
      ))}
    </>
  )
}

function Total({parts}) {

  const total = parts.reduce((sum, curr) => sum += curr.exercises, 0)

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

function App() {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
