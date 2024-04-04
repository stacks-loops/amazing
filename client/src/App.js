import React, {useState, useEffect} from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/users").then(
    res => {
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
    <div>App</div>
  )
}

export default App