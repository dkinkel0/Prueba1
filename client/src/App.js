import './App.css';
import { Switch, Route } from 'react-router-dom';
import LadingPage from './components/LadingPage.jsx'
import Home from './components/Home.jsx'
import GameDetail from './components/GameDetail.jsx'
import CreateGame from './components/CreateGame.jsx'

function App() {
  return (
    <div className="App">
      {/* <h1>...Soy App...</h1> */}
      <Switch>
        <Route exact path='/' component={LadingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/game/:id' component={GameDetail}/>
        <Route exact path='/addgame' component={CreateGame}/>

      </Switch>
    </div>
  );
}

export default App;
