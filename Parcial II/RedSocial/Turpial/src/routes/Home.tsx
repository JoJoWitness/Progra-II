import "../styles/home.css"
import AT from "../assets/at.svg"
import Upload from "../assets/upload.svg"
import User from "../assets/Account.svg"
import PlaceHolder from "../assets/placeHolder.jpg"
import { TweetOnlyText, TweetWithImg } from "../components/tweet";

const Home = () => {
  return (
    <div className="home_mainContainer">
      <div>
        <div className="home_header">
          <h2>Home</h2>  
          <img src={AT}/>
        </div>
        <div className="home_tweetBox">
          <img src={User}/>
          <div className="home_tweetInputContainer">
            <textarea rows={20} placeholder="Escribe Algo" style={{height: "80%"}} maxLength={200}/>
            <div className="home_tweetContainerButtons">
              <img src={Upload}/>
              <button> Tweet</button>
            </div>
          </div>
        </div>
      </div>
      <TweetOnlyText User_img={User} User_name={"@Ryuk_catSlayer"} User_text="Quiero perrarina" IsLiked={true}/>
      <TweetWithImg User_img={User} User_name={"@Ryuk_catSlayer"} User_text="Mis Enemigos" User_imgContent={PlaceHolder}  IsLiked={true}/>

    </div>
  );
};

export default Home;