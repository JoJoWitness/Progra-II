import { useState, useRef, useEffect } from "react";
import "../styles/profile.css"
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Ensure you have a supabaseClient file that exports the initialized supabase client
import Arrow from "../assets/arrow.svg";
import Upload from "../assets/upload.svg";
import { TweetOnlyText } from "../components/tweet";
import User from "../assets/Account.svg"
import { decode } from "base64-arraybuffer";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState<string | undefined>();
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [userId, setUserId] = useState<string | undefined>()
  const [userBio, setUserBio] = useState();
  const [userImg, setUserImg] = useState<File | null>(null);
  const [tempUserImg,setTempUserImg] = useState<File | null>(null);
  const [tweets, setTweets] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  
 
 
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const user = session.user;
        setUserEmail(user.email);
        setUserId(user.id)

        const { data:userInfo, error } = await supabase
          .from("Users")
          .select('user_name, user_bio')
          .eq("user_id", session.user.id)
          .single();
        if (error) {
          console.error("Error fetching user profile:", error);
        } else {
          setUserName(userInfo.user_name);
          setUserBio(userInfo.user_bio);
        }
      }
    };

  useEffect(() => {
    fetchUserProfile()
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAllTweets();
    }
  }, [userId]);
 
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setTempUserImg(file);
    
    }
  };

  async function uploadFile() {
    console.log(tempUserImg)
      const { data, error } = await supabase.storage.from('User_Images').upload('public/users',  decode(tempUserImg),{
        usert: false
      })
      if (error) {
        console.error("Error updating user image:", error);
      } else {
        setUserImg(file);
      }
    
  }
  


  const handleSave = async () => {

    
    if (tempUserImg) {
      uploadFile();
    }
    setIsEditing(false);
 
    
    const { data, error } = await supabase
      .from("Users")
      .update({ 
        user_name: (!userName.includes("@") ? `@${userName}` : userName),  
        user_bio: userBio,})
      .eq("email", userEmail); 

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      console.log("Profile updated successfully:", data);
      // setUserImgUrl(imageUrl);
    
    }
  };

  const fetchAllTweets = async () =>{
    const { data: tweetsArray, error } = await supabase
    .from("Tweets")
    .select()
    .eq("tweet_userUuid", userId)

   

    if (error) {
      console.error("Error fetching tweets:", error);
    } else {
     
      setTweets(tweetsArray)
    
    }
    
  }

  return (
    <div className="profile_container">
    <div>
      <div className="profile_header">
        <img src={Arrow} onClick={() => navigate(-1)} />
        <h2>{userName}</h2>
      </div>
      <div className="profile_blankSpace">
        <img src={userImg} alt="User" />
      </div>
      <div className="profile_info">
          <div className="profile_infoDiv">
          {isEditing ? 
            <input
              type="text"
              value={userName}
              className="profile_editInput"
              onChange={(e) => setUserName(e.target.value)}
            />
            :  
            <h3>{userName}</h3>
          }
             <p>{userEmail}</p>
          {isEditing ? 
            <textarea
            value={userBio}
            onChange={(e) => setUserBio(e.target.value)}
            style={{ resize: "none" }}
            maxLength={100}
             className="profile_textBox"
            />
          :
          <p>{userBio}</p>
          }
          
           
          </div>
          {
            isEditing ? 
            <div className="profile_editBtns">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <img src={Upload} onClick={() => fileInputRef.current?.click()}/>

              <button onClick={handleSave}>Guardar</button>
            </div>
            :
            <button onClick={toggleEditMode}>Editar Informacion</button>
          }
        
      </div>
     
    </div>
    {(tweets) ? tweets.map((tweet) =>(
        <TweetOnlyText
          key={tweet.id}
          User_img={User} 
          User_name={tweet.tweet_username}
          User_text={tweet.tweet_body} 
          Date={tweet.created_at}
          IsLiked={true}/>
      )) : null}
    </div>
  );
};

export default Profile;