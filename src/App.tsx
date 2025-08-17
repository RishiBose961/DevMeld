import { Route, Routes } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import { Header } from "./components/header/Header";
import useAuthEffect from "./components/useAuthEffect";
import SinglePost from "./pages/post/SinglePost";

const App = () => {
  useAuthEffect();
  return (
    <div className="max-w-7xl mx-auto px-1">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/*" element={<div>404</div>} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<div>Profile</div>} />
          <Route path="/p/:id" element={<SinglePost/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
