import { Link } from 'react-router-dom'


function HomePage() {
  return (
    <div>
        <h1>HomePage</h1>
        <Link to="/add-patient">Add Patient</Link>
    </div>
  )
}

export default HomePage