import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/Products/productList';
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import ShoppingCart from './components/Cart/shoppingCart';
import Layout from './components/commen/layout';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
