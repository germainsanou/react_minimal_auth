import { Outlet, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Error404 from './partials/Error404';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/auth/Register';
import { useAuthContext } from './hooks/AuthContext';
import MainNavBar from './partials/navbar';
import Panier from './pages/panier/Panier';

function Root() {
  return <div className='block w-full mx-auto max-w-screen-xl'>
    <MainNavBar/>
    <div>
      <Outlet />
    </div>
  </div>
}

function App() {
  const auth = useAuthContext()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error404 />,
      children: [
        {
          path: '',
          element: <div>Home Page</div>
        },
        {
          path: "/login",
          element: <Login />,
          loader: () => auth.isAuthenticated ? redirect('/dashboard') : null
        },
        {
          path: "/register",
          element: <Register />,
          loader: () => auth.isAuthenticated ? redirect('/dashboard') : null
        },
        {
          path: "/cart",
          element: <Panier />,
          loader: () => auth.isAuthenticated ? redirect('/dashboard') : null
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          loader: () => auth.isAuthenticated ? null : redirect('/login')
        },
      ]
    },
  ])

  return <RouterProvider router={router} />
}

export default App
