import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
<header>
    <section className="column is-desktop">
      <nav className="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="container is-desktop">
          <div className="navbar-brand">
          <div className="navbar-item"><b>Chain Reaction</b></div> </div>
          <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item"><Link to='/'>Home</Link></div>
                <div className="navbar-item"><Link to='/projects'>Explore Projects</Link></div>
                <div className="navbar-item"><Link to='/organization'>Organization</Link></div>
                <div className="navbar-item"><Link to='/profile'>Profile</Link></div>
              </div>
          </div>
        </div>
      </nav>
    </section>
    <section>
      <div className="hero is-info">
        <div className="hero-body is-desktop">
          <div className="container">
            <h1 className="title">Skilled Volunteerism Colony</h1>
            <h2 className="subtitle">Main Page</h2>
          </div>
        </div>
      </div>
    </section>
</header>
)

export default Header