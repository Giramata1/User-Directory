import { Link } from "react-router-dom";

const NavBar = () => (
  <nav style={{ padding: "10px", background: "#f0f0f0", marginBottom: "20px" }}>
    <Link to="/" style={{ marginRight: "15px" }}>
      Home
    </Link>
    <Link to="/add-user">Add User</Link>
  </nav>
);

export default NavBar;
