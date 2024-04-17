import { Link } from "react-router-dom";
import logo from '../assets/transp-logo.png'
// import styles from './Navbar.module.css'


interface NavLink {
  path: string;
  label: string;
}

const navLinks: NavLink[] = [
  { path: "/spalla-home", label: "Home" },
  { path: "/my-patients", label: "Patients" },
  { path: "/providers", label: "Providers" },
  { path: "/", label: "Logout" },
  { path: "/login", label: "Login" },

];

const Navbar = () => {
  const currentPath = window.location.pathname;

  return (
    <nav className="nav">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
        {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="nav-link custom-spalla-link">
                {link.path === currentPath ? <b>{link.label}</b> : link.label}
            </Link>
        ))}
    </nav>
  );
};
export default Navbar;
