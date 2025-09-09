import { Route, Routes } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import { Header } from "./components/header/Header";
import useAuthEffect from "./components/useAuthEffect";
import SinglePost from "./pages/post/SinglePost";
import Codesubmit from "./pages/code/Codesubmit";
import SearchPage from "./pages/Search/SearchPage";

const App = () => {
  useAuthEffect();

  
  return (
    <div className="max-w-7xl mx-auto px-1">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/*" element={<div>404</div>} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<div>Profile</div>} />
          <Route path="/p/:id" element={<SinglePost/>} />
          <Route path="/code-solution/:id/post/:posted" element={<Codesubmit/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
