import MTHeart from "../assets/favoriteFilled.svg"
import FilledHeart from "../assets/favoriteMT.svg"


interface TweetTXTProps {
  User_img: string;
  User_name: string;
  User_text: string;
  IsLiked: boolean
}

interface TweetIMGProps {
  User_img: string;
  User_name: string;
  User_text: string;
  User_imgContent: string;
  IsLiked: boolean
}


export const TweetOnlyText = ({ User_img, User_name, User_text, IsLiked }: TweetTXTProps) => {
  return (
    <div className="tweet_container">
      <img src={User_img} alt="User Image" />
      <div className="tweet_contentContainer">
        <p className="tweet_user">{User_name}</p>
        <p className="tweet_text">{User_text}</p>
        {IsLiked ? <img className="heart" src={FilledHeart}/> : <img className="heart" src={MTHeart}/> }
      </div>
      
    </div>
  );
};


export const TweetWithImg = ({ User_img, User_name, User_text, User_imgContent, IsLiked }: TweetIMGProps) => {
  return (
    <div className="tweet_container">
      <img src={User_img} alt="User Image" />
      <div className="tweet_contentContainer">
        <p className="tweet_user">{User_name}</p>
        <img className="tweet_img" src={User_imgContent}/>
        <p className="tweet_text">{User_text}</p>
        {IsLiked ? <img className="heart" src={FilledHeart}/> : <img className="heart" src={MTHeart}/> }
      </div>
      
    </div>
  );
};


