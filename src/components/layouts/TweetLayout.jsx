import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { GridContainer } from '../../globalStyles';
import { Navbar } from '../Navbar';
import Popular from '../Popular';
import { useUser } from '../../contexts/UserContext';
import { addTweet } from '../../api/tweet';
import {
  getCurrentUser,
  getUserFollowings,
  getUserLikes,
} from '../../api/user';

export default function TweetLayout() {
  const { currentUser, setCurrentUser, setUserFollowings, setUserLikes } =
    useUser();
  const [tweets, setTweets] = useState([]);
  const [tweetInput, setTweetInput] = useState('');
  const { pathname } = useLocation();

  const handleInputChange = (value) => {
    setTweetInput(value);
  };

  const handleAddTweet = async () => {
    try {
      const data = await addTweet({ description: tweetInput });
      if (data === 'error') return;
      const nextTweets = [
        {
          id: data.tweetInput.id,
          description: data.tweetInput.description,
          createdAt: data.tweetInput.createdAt,
          replyCounts: 0,
          likeCounts: 0,
          isLiked: 0,
          User: {
            id: currentUser.id,
            account: currentUser.account,
            name: currentUser.name,
            avatar: currentUser.avatar,
          },
        },
        ...tweets,
      ];
      setTimeout(() => {
        setTweets(nextTweets);
        setTweetInput('');
      }, 3000);
      return { status: 'ok' };
    } catch (error) {
      console.log(error);
      return { status: 'error' };
    }
  };

  useEffect(() => {
    const getUserAsync = async () => {
      try {
        // get user data
        const user = await getCurrentUser();
        // get user followinds
        const followings = await getUserFollowings(user.id);
        const followingUsers = followings.map((following) => following.id);
        // get user likes
        const likes = await getUserLikes(user.id);
        const likedTweets = likes.map((tweet) => tweet.id);
        setCurrentUser({
          ...user,
          introduction: user.introduction ?? 'I like alpha camp',
          avatar: user.avatar ?? 'http://placekitten.com/g/500/500',
          cover:
            user.cover ?? 'https://loremflickr.com/640/480/nature?lock=27430',
        });
        setUserFollowings(followingUsers);
        setUserLikes(likedTweets);
      } catch (error) {
        console.error(error);
      }
    };
    getUserAsync();
  }, []);

  return (
    <GridContainer>
      <div className="fr1">
        <Navbar
          tweetInput={tweetInput}
          currentUser={currentUser}
          onChange={handleInputChange}
          onAddTweet={handleAddTweet}
        />
      </div>
      <div className="fr2">
        <Outlet
          context={{
            currentUser,
            tweets,
            setTweets,
            tweetInput,
            handleInputChange,
            handleAddTweet,
          }}
        />
      </div>
      <div className="fr3">{!pathname.includes('settings') && <Popular />}</div>
    </GridContainer>
  );
}
