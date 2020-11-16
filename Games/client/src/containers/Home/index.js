import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const Home = () => (
  <div className='home-page'>
    <div className='header'>
      Crypto-Casino.
    </div>
    <div className='games'>
      <div>
        <span> Blackjack: </span>
        <Link to='/blackjack'>
          <button>Ir al juego</button>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;