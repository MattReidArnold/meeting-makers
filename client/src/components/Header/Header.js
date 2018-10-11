import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
  let content = (
    <li>
      <a href="/auth/google">Sign In With Google</a>
    </li>
  );
  if (props.user) {
    content = [
      <li key="1">
        <span>Hello, {props.user.givenName}</span>
      </li>,
      <li key="2">
        <img
          style={{ borderRadius: '50%', padding: '8px 8px' }}
          src={props.user.imageUrl}
          alt="User profile"
        />
      </li>,
      <li key="3">
        <a href="/auth/logout">Logout</a>
      </li>
    ];
  }

  return (
    <header>
      <nav>
        <div className="nav-wrapper blue">
          <Link className="brand-logo" to="/">
            Meeting Makers
          </Link>
          <ul className="right">
            <li>
              <Link to="/meetings">Meetings</Link>
            </li>
            {content}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
