import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const Navbar = () => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <div>
        Logo
      </div>
      {/* <Logo /> */}
    </Link>
    <div className='options'>
      <Link className='option' to='/blackjack'>
        Blackjack
      </Link>
      <Link className='option' to='/'>
        Wheel Fortune
      </Link>
    </div>
  </div>
);

export default Navbar;