import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import SingleUser from './pages/SingleUser.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout />,
    children : [
      {
        path : '',
        element : <Home />
      },
      { 
        path : 'dashboard',
        element : <Dashboard />
      },
      { 
        path : 'profile',
        element : <Profile />
      },
      { 
        path : 'register',
        element : <Register />
      },
      { 
        path : 'login',
        element : <Login />
      },
      { 
        path : 'user',
        element : <SingleUser />
      },
    ] 
}
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
  </RouterProvider>
)
