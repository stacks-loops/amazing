import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Auth from "./components/Auth";


function App() {

  const [data, setData] = useState({users: [] })
  const [loggedInUser, setLoggedInUser] = useState(null)

  function logoutUser() {
    setLoggedInUser(null)
  }
  
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
    <div className={className}>
     {
      !!loggedInUser ?
      <Outlet /> :
      <Auth setUser={setLoggedInUser} />
     }
      {/* <h1> Users: </h1>
      <ul>
        {data.users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul> */}

  </div>
  )
}

export default App