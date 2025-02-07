import { Link, useLocation } from "react-router-dom";
import user from "../img/user.jpg";
import UserCard from "./UserCard";
import "../Styles/Navbar.css";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { userId } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          SALON
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <br />
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
              >
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                to="/about"
              >
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/book" ? "active" : ""}`}
                to="/book"
              >
                BOOK
              </Link>
            </li>
            <li className="nav-item">
              <div className="dropdown">
                <Link
                  className="btn btn-dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  SERVICES
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link className="dropdown-item" to="/service/haircut">
                      Haircut
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/service/haircolor">
                      Hair Color
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/service/hairstyle">
                      Hair Styling
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/service/manicure">
                      Manicure
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/service/pedicure">
                      Pedicure
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/service/makeup">
                      Makeup
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          {!userId ? (
            <div>
              {" "}
              <button onClick={() => navigate("/login")} className="btn-login">
                Login
              </button>
            </div>
          ) : (
            <div className="position-relative">
              <button
                className="btn p-0 border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img className="img-user" src={user} alt="User" />
              </button>
              <div className="dropdown-menu menu-card dropdown-menu-end">
                <UserCard />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
