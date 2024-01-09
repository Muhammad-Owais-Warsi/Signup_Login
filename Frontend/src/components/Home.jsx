import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/home.css"

const Home = () => {
  return (
    <div class="menu">
      <nav>
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Signup</a>
          </li>
        </ul>
      </nav>
    </div>

  );
};

export default Home;
