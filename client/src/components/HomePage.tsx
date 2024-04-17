import { Link } from 'react-router-dom'


function HomePage() {
  return (
    <div>
        <h1>Spalla Healthcare Home</h1>
        <Link to="/login">Sign In</Link>
        <br></br>
        <Link to="/add-patient">Add Patient</Link>
    </div>
  )
}

export default HomePage