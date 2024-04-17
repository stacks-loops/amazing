import { Link } from "react-router-dom";
import backgroundImage from "../assets/assisi.jpg";

function HomePage() {
  return (
    <div
      className="home-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="card-overlay">
        <div className="content">
          {/* <img src={backgroundImage} alt="BackgroundImage" className="BackgroundImage" /> */}
          <h1>Spalla Healthcare Home</h1>
          <Link to="/login">Sign In</Link>
          <br></br>
          <Link to="/add-patient">Add Patient</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
