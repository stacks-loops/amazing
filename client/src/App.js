import React, {useState, useEffect} from 'react'

function App() {

  const [data, setData] = useState({users: [] })

  useEffect(() => {
    fetch("/users")
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was in fact not okay")
      }
      return res.json()
    })
    .then(data => {
        setData(data)
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <div>
      <h1> Users: </h1>
      <ul>
        {data.users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>

  </div>
  )
}

export default App