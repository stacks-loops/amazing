import { Link } from "react-router-dom";
import styles from './Navbar.module.css'


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
    <nav className={styles.navbar}>
        {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="nav-link">
                {link.path === currentPath ? <b>{link.label}</b> : link.label}
            </Link>
        ))}
    </nav>
  );
};
export default Navbar;
