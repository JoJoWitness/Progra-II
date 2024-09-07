import {Route,ScrollRestoration, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import Profile from './routes/Profile';
import './App.css';
import { Root } from './routes/Root';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import "./styles/auth.css";
import bg from "./assets/bg.jpg"
import Bird from "./assets/Bird.svg"


const supabase = createClient( import.meta.env.VITE_SUPABASE_URL as string, import.meta.env.VITE_SUPABASE_API_KEY as string)



const router = createBrowserRouter(
  createRoutesFromElements(
      <>
            <Route path="/" >
                <Route path="" element={<><ScrollRestoration />
                        <Root /> 
                    </>} >
                    <Route index element={<Home />} />
                    <Route path="Profile" element={<Profile />} />
                </Route>
            </Route>
            </>
    )
)

export default function App() {
    const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        //@ts-ignore
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        //@ts-ignore
        setSession(session)
        
      

      })

      return () => subscription.unsubscribe()
    }, [])

    if(!session){
        return ( 
        <div className="auth_mainContainer">
            <img src={bg}/>
            <div className="auth_bar">
                <div className='logo_container'>
                    <img src={Bird} className='logo'/> 
                    <p className="logo_Text">TURPIAL</p>
                </div>

                <Auth supabaseClient={supabase} appearance={{ 
                    extend: false,
                    className:{
                        button: "auth_buttonComponent",
                        input: "auth_inputComponent",
                        container: "auth_containerComponent",
                        anchor: "auth_anchor",
                        divider: "auth_divider"
                    },
                    style:{
                        label : {display: 'none'},
                       
                     
                    } 
                }}
                    
                    />
            </div>
        </div>)
    }
    else{
        return <RouterProvider router={router} />
    }

    
}
