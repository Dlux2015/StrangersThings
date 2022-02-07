import { Link } from "react-router-dom";

const Navbar = ({ user, setToken, setUser, lstoken }) => {
  if (lstoken !== null) {
    //   Logged In
    return (
      <>
        <section id="Navbar">
          <h1 id="Nav-title"> Stranger's Things</h1>
          <Link id="header-link" to="/">
            {" "}
            Home
          </Link>
          <Link id="header-link" to="/Posts">
            {" "}
            Posts
          </Link>
          <Link id="header-link" to="/Profile">
            {" "}
            Profile
          </Link>
          <Link
            id="header-link"
            to="/"
            onClick={() => {
              setToken("");
              setUser([]);
              localStorage.removeItem("token");
            }}
          >
            Log Out
          </Link>
          <div id="Nav-user">
            {user && <span>Welcome {user.username}</span>}
          </div>
        </section>
      </>
    );
  } else {
    //   Logged Out
    return (
      <>
        <section id="Navbar">
          <h1 id="Nav-title"> Stranger's Things</h1>
          <Link id="header-link" to="/">
            {" "}
            Home
          </Link>
          <Link id="header-link" to="/Posts">
            {" "}
            Posts
          </Link>
          <Link id="header-link" to="/Register">
            {" "}
            Register
          </Link>

          <Link id="header-link" to="/Login">
            {" "}
            Login
          </Link>
        </section>
      </>
    );
  }
};

export default Navbar;
