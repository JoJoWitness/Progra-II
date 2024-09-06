import "../styles/auth.css";
import bg from "../assets/bg.jpg"
import Bird from "../assets/Bird.svg"

const AuthPage = () => { 
    return (
        <div className="auth_mainContainer">
            <img src={bg}/>
            <div className="auth_bar">
                <div className='logo_container'>
                    <img src={Bird} className='logo'/> 
                    <p className="logo_Text">TURPIAL</p>
                </div>

                <div className="auth_form">
                    <input type="text" placeholder="Correo Electronico"/>
                    <input type="password" placeholder="Contraseña"/>
                </div>

                <div className="auth_button">
                    <button>Iniciar Sesion</button>
                    <button>Registrarse</button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;