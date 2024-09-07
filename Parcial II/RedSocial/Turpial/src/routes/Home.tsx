import "../styles/home.css"
import AT from "../assets/at.svg"
import Upload from "../assets/upload.svg"
import User from "../assets/Account.svg"
import PlaceHolder from "../assets/placeHolder.jpg"
import { TweetOnlyText, TweetWithImg } from "../components/tweet";
import { supabase } from "../supabaseClient"
import { useEffect, useState } from "react"


const Home = () => {
  
  
  const [tweetContent, setTweetContent] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [tweets, setTweets] = useState([]);


    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const user = session.user;
        setUserId(user.id);

        const { data, error } = await supabase
          .from("Users") 
          .select("user_name")
          .eq("user_id", user.id)
          .single();
         
   
           if (error && error.code === 'PGRST116') {
            const userName = "@" + session?.user.email?.split("@")[0]
            const {error} = await supabase
              .from("Users")
              .insert([{user_name: userName, user_bio: "Escribe algo interesante"}]);
          
            if (error) {
              console.error("Error creating user profile:", error);
            }
          } 

        if (error) {
          console.error("Error fetching user profile:", error);
        } else {
          setUserName(data.user_name);
         
        }
      }
    };

    useEffect(()=>{
      fetchUserProfile()
      fetchAllTweets();
    }, [])

  const handleTweetChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetContent(event.target.value);
  };

  const handleTweetSubmit = async () => {
    const { data, error } = await supabase
      .from("Tweets") 
      .insert([{ tweet_body: tweetContent, tweet_username: userName }]); 

    if (error) {
      console.error("Error uploading tweet:", error);
    } else {
      console.log("Tweet uploaded successfully:", data);
      setTweetContent("");
    }
  };

  const fetchAllTweets = async () =>{
    const { data: tweetsArray, error } = await supabase
    .from("Tweets")
    .select()

    if (error) {
      console.error("Error fetching tweets:", error);
    } else {
     
      setTweets(tweetsArray)
      console.log(tweets)
    }
    
  }


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
            
          <textarea
              rows={20}
              placeholder="Escribe Algo"
              style={{ height: "80%" }}
              maxLength={200}
              value={tweetContent}
              onChange={handleTweetChange}
            />
            <div className="home_tweetContainerButtons">
              <img src={Upload} alt="Upload" />
              
              <button onClick={
                tweetContent.length === 0 ? undefined : handleTweetSubmit }>Tweet</button>
            </div>

          </div>
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

export default Home;

