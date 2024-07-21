import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTodos } from "../contexts/TodoContext";


const Navbar = () => {
  const { user, logout }=useAuth();
  const {search,setSearch}=useTodos();
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const Logout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h3 className="text-white">TODO-APP 📝</h3>
        </Link>
        <button
          className="navbar-toggler-white d-lg-none border-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/addTodo">
                    Create New Todo ✚
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/" onClick={Logout}>
                    Logout
                  </Link>
                </li>
                <form className="d-flex ms-lg-3 ms-auto">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search Todos"
                    aria-label="Search"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </form>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
