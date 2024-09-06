import {Route, Routes, Link, ScrollRestoration, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import Profile from './routes/Profile';
import './App.css';
import { Root } from './routes/Root';
import AuthPage from './routes/AuthPage';

const isLogged = true;

const router = createBrowserRouter(
  createRoutesFromElements(
      <>
            <Route path="/" >
                <Route path="" element={<><ScrollRestoration />
                        {isLogged ?<Root /> : <AuthPage /> }
                    </>} >
                    <Route index element={<Home />} />
                    <Route path="Profile/:username" element={<Profile />} />
                </Route>
            </Route>
            </>
    )
)

export default function App() {
    return <RouterProvider router={router} />
}
