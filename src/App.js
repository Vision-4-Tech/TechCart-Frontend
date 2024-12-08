
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
import NewHome from './components/NewHome';
import NewHeader from './components/NewHeader'
import { UserProvider } from './components/context/userContext';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <NewHeader />
          <div style={{ marginTop: "3rem" }}>
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/" element={<NewHome />} />
              <Route path="/login" element={<Signup />} />

              <Route path="hero" element={<Hero />} />
              <Route element={<ProtectedRoute />}>
                <Route path="cart" element={<ItemCard />} />

                <Route path="orders" element={<Orders />} />
              </Route>
              <Route path="account" element={<Account />} />

              <Route path="/admin" element={<Admin />}>
                <Route path="dashboard" element={<Content />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="customers" element={<Customer />} />
                <Route path="history" element={<History />} />
              </Route>

              <Route path="/details/:id" element={<Details />}></Route>
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
