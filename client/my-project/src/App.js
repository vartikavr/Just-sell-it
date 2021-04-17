import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Login from './views/users/login';
import Navbar from './navbar';
import Register from './views/users/register';
import Category from './category';
import Books from './views/products/books';
import Cycles from './views/products/cycles';
import Furniture from './views/products/furniture';
import Handicrafts from './views/products/handicrafts';
import Others from './views/products/others';
import Logout from './views/users/logout';
import ForgotPwd from './views/users/forgotPwd';
import SecurityPwd from './views/users/securityPwd';
import ResetPwd from './views/users/resetPwd';
import BookDisplay from './views/products/displayBook';
import CycleDisplay from './views/products/displayCycle';
import FurnitureDisplay from './views/products/displayFurniture';
import HandicraftDisplay from './views/products/displayHandicraft';
import OtherDisplay from './views/products/displayOther';
import NewBook from './views/products/newBook';
import NewCycle from './views/products/newCycle';
import NewFurniture from './views/products/newFurniture';
import NewHandicraft from './views/products/newHandicraft';
import NewOther from './views/products/newOther';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Navbar />
          <Login />
        </Route>
        <Route exact path='/forgotPwd'>
          <Navbar />
          <ForgotPwd />
        </Route>
        <Route exact path='/security'>
          <Navbar />
          <SecurityPwd />
        </Route>
        <Route exact path="/resetPwd">
          <Navbar />
          <ResetPwd />
        </Route>
        <Route exact path="/register">
          <Navbar />
          <Register />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/categories">
          <Navbar />
          <Category />
        </Route>
        <Route exact path="/categories/books/new">
          <Navbar />
          <NewBook />
        </Route>
        <Route exact path="/categories/books">
          <Navbar />
          <Books />
        </Route>
        <Route exact path="/categories/books/:id">
          <Navbar />
          <BookDisplay />
        </Route>
        <Route exact path="/categories/cycles/new">
          <Navbar />
          <NewCycle />
        </Route>
        <Route exact path="/categories/cycles">
          <Navbar />
          <Cycles />
        </Route>
        <Route exact path="/categories/cycles/:id">
          <Navbar />
          <CycleDisplay />
        </Route>
        <Route exact path="/categories/furniture/new">
          <Navbar />
          <NewFurniture />
        </Route>
        <Route exact path="/categories/furniture">
          <Navbar />
          <Furniture />
        </Route>
        <Route exact path="/categories/furniture/:id">
          <Navbar />
          <FurnitureDisplay />
        </Route>
        <Route exact path="/categories/handicrafts/new">
          <Navbar />
          <NewHandicraft />
        </Route>
        <Route exact path="/categories/handicrafts">
          <Navbar />
          <Handicrafts />
        </Route>
        <Route exact path="/categories/handicrafts/:id">
          <Navbar />
          <HandicraftDisplay />
        </Route>
        <Route exact path="/categories/others/new">
          <Navbar />
          <NewOther />
        </Route>
        <Route exact path="/categories/others">
          <Navbar />
          <Others />
        </Route>
        <Route exact path="/categories/others/:id">
          <Navbar />
          <OtherDisplay />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;