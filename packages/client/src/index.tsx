import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import App from './App';
import Error from './routes/Error';
import Home from './routes/Home';
import Profile from './routes/Profile';
import ProductList from './routes/Product-List';
import Product from './routes/Product';
import UserRegister from './routes/User-Register';
import ProductRegister from './routes/Product-Register';
import UserLogin from './routes/User-Login';
import UserProductList from './routes/User-Product-List';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/list/allproducts',
        element: <ProductList />
      },
      {
        path: '/list/userproducts',
        element: <UserProductList />
      },
      {
        path: '/product/:id',
        element: <Product />
      }
      ,
      {
        path: '/register/user',
        element: <UserRegister />
      }
      ,
      {
        path: '/register/product',
        element: <ProductRegister />
      },         
      {
        path: '/login',
        element: <UserLogin />
      }
    ]
  }
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
