
import * as React from "react";
import { Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import './App.css';


function User() {
  const { name } = useParams()
  const { pathname } = useLocation();
  let navigate = useNavigate();
  return (
    <div className="User">
      <h2>User</h2>
      <p>Username is {name}.</p>
      <p>Current URL: {pathname}</p> 
    </div>
  );
}

function Home() {
  const { pathname } = useLocation();
  let navigate = useNavigate();
  return (
    <div className="Home">
      <h2>Home</h2>
      <p>This is your application Home page.</p>
      <p>Current URL: {pathname}</p> 
    </div>
  );
}

function About() {
  const { pathname } = useLocation();
  let navigate = useNavigate();
  return (
    <div className="About">
      <h2>About</h2>
      <p>This is your application About page.</p>
      <p>Current URL: {pathname}</p> 
    </div>
  );
}

function App() {
  const name = "KirsiKernel"
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/user/:name" element={<User />} />
      </Routes>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>          
          <li><Link to={`/user/${name}`}>User</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
