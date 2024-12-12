import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/Products/productList';
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import NavBar from './components/common/navbar';
import { RouteName } from './routes/RouteName';
import { CartProvider } from './context/cartContext';
import { useState } from 'react';
import ProtectedRoute from './components/common/protectedRoute';
// import PageNotFound from './components/common/404';


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (

    <CartProvider>
      <Router>
        <Routes>
          <Route path={RouteName.LOGIN} element={<Login />} />
          <Route path={RouteName.SIGNUP} element={<Signup />} />
          {/* <Route path={RouteName.NOTFOUND} element={<PageNotFound />} /> */}

          <Route element={<ProtectedRoute />}>

            <Route element={< NavBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />}>
              <Route path={RouteName.PRODUCTLIST} element={<ProductList searchTerm={searchTerm} selectedCategory={selectedCategory} />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
