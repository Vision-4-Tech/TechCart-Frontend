
import './App.css';

import Admin from './Admin/Admin';
import Signup from './components/Signup';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Signin from './components/Signin';
import Home from './components/Home';
import Details from './Admin/Details';
import Hero from './components/Hero';
import ItemCard from './components/ItemCard';
import Account from './components/Account';
import Orders from './components/Orders';
import Inventory from "./Admin/Inventory";
import Customer from './Admin/Customer';
import History from './Admin/History';
import Content from './Admin/Content';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/login" element={<Signup />} />
          <Route path="home" element={<Home />}>
            <Route path="hero" element={<Hero />} />
            <Route path="cart" element={<ItemCard />} />
            <Route path="account" element={<Account />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          <Route path="/admin" element={<Admin />}>
            <Route path='dashboard' element={<Content/>}/>
            <Route path="inventory" element={<Inventory />} />
            <Route path="customers" element={<Customer />} />
            <Route path="history" element={<History />} />
          </Route>

          <Route path="/details/:id" element={<Details />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
