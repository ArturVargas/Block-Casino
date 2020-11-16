import { Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/index';
import Home from './containers/Home/index';
import Blackjack from './containers/BlackJack/index';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/blackjack' component={Blackjack} />
      </Switch>
    </div>
  );
}

export default App;
