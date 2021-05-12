import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Login from './views/users/login';
import Navbar from './navbar';
import Register from './views/users/register';
import Category from './category';
import Books from './views/products/books/books';
import Cycles from './views/products/cycles/cycles';
import Furniture from './views/products/furniture/furniture';
import Handicrafts from './views/products/handicrafts/handicrafts';
import Others from './views/products/others/others';
import Logout from './views/users/logout';
import ForgotPwd from './views/users/forgotPwd';
import BookDisplay from './views/products/books/displayBook';
import CycleDisplay from './views/products/cycles/displayCycle';
import FurnitureDisplay from './views/products/furniture/displayFurniture';
import HandicraftDisplay from './views/products/handicrafts/displayHandicraft';
import OtherDisplay from './views/products/others/displayOther';
import NewBook from './views/products/books/newBook';
import NewCycle from './views/products/cycles/newCycle';
import NewFurniture from './views/products/furniture/newFurniture';
import NewHandicraft from './views/products/handicrafts/newHandicraft';
import NewOther from './views/products/others/newOther';
import EditBook from './views/products/books/editBook';
import EditCycle from './views/products/cycles/editCycle';
import EditFurniture from './views/products/furniture/editFurniture';
import EditHandicraft from './views/products/handicrafts/editHandicraft';
import EditOther from './views/products/others/editOther';
import UserProfile from './views/users/userProfile';
import UpdateQA from './views/users/updateQA';
import EditProfile from './views/users/editProfile';
import UserProducts from './views/users/userProducts';
import AdminRegister from './views/admin/register';
import AllUsers from './views/admin/allUsers';
import GetUserProfile from './views/admin/getUserProfile';
import GetUserProducts from './views/admin/getUserProducts';
import Wishlist from './views/users/wishlist';
import ConfirmEmail from './confirmEmail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/admin/register">
          <Navbar />
          <AdminRegister />
        </Route>
        <Route exact path="/confirmation/:token">
          <Navbar />
          <ConfirmEmail />
        </Route>
        <Route exact path="/admin/users">
          <Navbar />
          <AllUsers />
        </Route>
        <Route exact path="/admin/:id/products">
          <Navbar />
          <GetUserProducts />
        </Route>
        <Route exact path="/admin/user-profile/:id">
          <Navbar />
          <GetUserProfile />
        </Route>
        <Route exact path="/login">
          <Navbar />
          <Login />
        </Route>
        <Route exact path='/forgotPwd'>
          <Navbar />
          <ForgotPwd />
        </Route>
        <Route exact path="/register">
          <Navbar />
          <Register />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/user">
          <Navbar />
          <UserProfile />
        </Route>
        <Route exact path="/user/edit">
          <Navbar />
          <EditProfile />
        </Route>
        <Route exact path="/user/products">
          <Navbar />
          <UserProducts />
        </Route>
        <Route exact path="/user/wishlist">
          <Navbar />
          <Wishlist />
        </Route>
        <Route exact path="/updateQA">
          <Navbar />
          <UpdateQA />
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
        <Route exact path="/categories/books/:id/edit">
          <Navbar />
          <EditBook />
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
        <Route exact path="/categories/cycles/:id/edit">
          <Navbar />
          <EditCycle />
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
        <Route exact path="/categories/furniture/:id/edit">
          <Navbar />
          <EditFurniture />
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
        <Route exact path="/categories/handicrafts/:id/edit">
          <Navbar />
          <EditHandicraft />
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
        <Route exact path="/categories/others/:id/edit">
          <Navbar />
          <EditOther />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;