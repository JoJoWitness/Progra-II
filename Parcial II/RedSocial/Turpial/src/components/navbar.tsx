import { Link } from 'react-router-dom';
import "../styles/navbar.css";
import Bird from "../assets/Bird.svg"
import Home from "../assets/Home.svg"
import User from "../assets/Account.svg"

export const Navbar = () => {


 
        return (
            <nav className="navbar">
                <div className='logo_container'>
                    <img src={Bird} className='logo'/> 
                    <p className="logo_Text">TURPIAL</p>
                </div>
                <div className='logo_link'>
                    <div className='nav_container'>
                        <img src={Home}/>
                        <Link className="nav-link" to="/" aria-current="page">Home</Link>
                    </div>
                    <div className='nav_container'>
                        <img src={User}/>
                        <Link className="nav-link" to="Profile">Usuario</Link>
                    </div>
                    
                    
                </div>
              
        
                       
                
            </nav>

        )

}