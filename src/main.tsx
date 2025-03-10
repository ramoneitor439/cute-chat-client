import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './views/Login/Login.tsx'
import CreateAccount from './views/CreateAccount/CreateAccount.tsx'
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import ChatLobby from './views/ChatLobby/ChatLobby.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <CreateAccount />
  },
  {
    path: "lobby",
    element: <ChatLobby />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <>
  <ToastContainer />
  <RouterProvider router={router} />
  </>
)
