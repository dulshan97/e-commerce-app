import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/Products/productList';
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import ShoppingCart from './components/Cart/shoppingCart';
import NavBar from './components/common/navbar';
import { RouteName } from './routes/RouteName';
import { CartProvider } from './context/cartContext';


const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={< NavBar />}>
            <Route path={RouteName.ROOT} element={<ProductList />} />
            <Route path={RouteName.LOGIN} element={<Login />} />
            <Route path={RouteName.SIGNUP} element={<Signup />} />
            <Route path={RouteName.CART} element={<ShoppingCart />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
