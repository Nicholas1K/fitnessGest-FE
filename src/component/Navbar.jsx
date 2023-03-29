import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark fixed-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" href="#">
          Muscle Gest
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              search menu
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page" href="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/course" className="nav-link" href="#">
                  Course
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/personal-trainer" className="nav-link" href="#">
                  Personal Trainer
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link" href="#">
                  User
                </Link>
                <Link to="/addressPTpage" className="nav-link" href="#">
                  Addresses Personal trainers
                </Link>
                <Link to="/addressUSPage" className="nav-link" href="#">
                  Addresses Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
