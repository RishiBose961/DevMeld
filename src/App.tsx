import { Route, Routes } from "react-router";
import { Header } from "./components/header/Header";
import PrivateRoute from "./components/PrivateRoute";
import useAuthEffect from "./components/useAuthEffect";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Codesubmit from "./pages/code/Codesubmit";
import CommunityPage from "./pages/Community/CommunityPage";
import Home from "./pages/Home/Home";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import PlayGoundRoom from "./pages/PlayGround/PlayGoundRoom";
import PlayGround from "./pages/PlayGround/PlayGround";
import SinglePost from "./pages/post/SinglePost";
import UserProfile from "./pages/Profile/UserProfile";
import UserStartupProfile from "./pages/Profile/UserStartupProfile";
import SearchPage from "./pages/Search/SearchPage";
import ViewSolution from "./pages/Solution/ViewSolution";

const App = () => {
  useAuthEffect();

  return (
    <div className="max-w-7xl mx-auto px-1">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/*" element={<div>404</div>} />
        <Route path="/dev/:id" element={<UserProfile />} />
        <Route path="/startup/:id" element={<UserStartupProfile />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/p/:id" element={<SinglePost />} />
          <Route path="/community/:id" element={<CommunityPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/code-solution/:id/post/:posted" element={<Codesubmit />} />
          <Route path="/playground" element={<PlayGround postId={""} />} />
          <Route path="/playground/:roomName/:postId" element={<PlayGoundRoom />} />
          <Route path="/solution/:id" element={<ViewSolution />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
