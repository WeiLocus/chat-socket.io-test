import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { GlobalStyle } from './globalStyles';
import {
  AdminPage,
  HomePage,
  LoginPage,
  ReplyPage,
  SettingsPage,
  SignupPage,
  TweetPage,
  UserPage,
  NotificationPage,
  PublicChatPage,
} from './pages';
import {
  AdminLayout,
  TweetLayout,
  AdminTweetList,
  AdminUserList,
  UserReplyList,
  UserTweetList,
  UserLikeList,
  FollowList,
} from './components';

const basename = import.meta.env.VITE_PUBLIC_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <UserProvider>
        <GlobalStyle />
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="admin">
            <Route index element={<AdminPage />} />
            <Route element={<AdminLayout />}>
              <Route path="tweets" element={<AdminTweetList />} />
              <Route path="users" element={<AdminUserList />} />
            </Route>
          </Route>
          <Route element={<TweetLayout />}>
            <Route path="tweets">
              <Route index element={<TweetPage />} />
              <Route path=":id" element={<ReplyPage />} />
            </Route>
            <Route path="notification" element={<NotificationPage />} />
            <Route path="public" element={<PublicChatPage />} />
            <Route element={<UserPage />}>
              <Route path="users/:id">
                <Route path="tweets" element={<UserTweetList />} />
                <Route path="replies" element={<UserReplyList />} />
                <Route path="likes" element={<UserLikeList />} />
                <Route
                  path="followers"
                  element={<FollowList type="followers" />}
                />
                <Route
                  path="followings"
                  element={<FollowList type="followings" />}
                />
              </Route>
            </Route>
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
