
import './App.css';

import Admin from './Admin/Admin';
import Signup from './components/Signup';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Signin from './components/Signin';
import Home from './components/Home';
import Details from './Admin/Details';
function App() {
  return (
    <div className="App">
    <h1>Welcme to Tech cart</h1>
       <Router>
       <Routes>
          <Route path='/' element={<Signin/>} />
          <Route path='/login' element={<Signup/>} />
          <Route path='/Home' element={<Home/>}/>
          <Route path='/:text' element={<Home/>} />
          <Route path='/Admin' element={<Admin/>}></Route>
          <Route path='/Admin/:text' element={<Admin/>}></Route>
          <Route path='/details/:id' element={<Details/>}></Route>
       </Routes>
       </Router>
    

    
    </div>
  );
}

export default App;
