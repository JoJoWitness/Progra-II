import "../styles/profile.css"
import Arrow from "../assets/arrow.svg"
import UserImg from "../assets/Account.svg"
import PlaceHolder from "../assets/placeHolder.jpg"
import { TweetOnlyText, TweetWithImg } from "../components/tweet";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const User = "@Ryuk_catSlayer"
  const User_email = "ryukCatSlayer@gmail.com"
  const User_bio = "Fiel creyente de que los gatos son seres malvalicos que buscan la destruccion de la humanidad"

  return (
    <div className="profile_container">
      <div>
        <div className="profile_header">
          <img src={Arrow} onClick={() => navigate(-1)}/>
          <h2>{User}</h2>   
        </div>
        <div className="profile_blankSpace">
          <img src={UserImg}/>
        </div>
        <div className="profile_info">
          <div className="profile_infoDiv">
            <h3>{User}</h3>
            <p>{User_email}</p>
            <p>{User_bio}</p>
          </div>
          <button> Editar Informacion</button>
        </div>
      </div>
      <TweetOnlyText User_img={User} User_name={"@Ryuk_catSlayer"} User_text="Quiero perrarina" IsLiked={true}/>
      <TweetWithImg User_img={User} User_name={"@Ryuk_catSlayer"} User_text="Mis Enemigos" User_imgContent={PlaceHolder}  IsLiked={true}/>

    </div>
  );
};

export default Home;