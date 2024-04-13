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
    fetch("/authorized")
    .then(response => {
      if (!response.ok) {
        response.json().then((user) => setLoggedInUser(user))
      }
      return response.json()
    })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <div >
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