import { useSelector } from "react-redux";
import AllPost from "../post/AllPost";
import Recommad from "../post/Recommad";

const Home = () => {
  const { isAuthenticated } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean
      };
    }) => state.auth
  );
  return (
    <div className="mt-4 mb-3">
      {
        isAuthenticated && <Recommad />
      }


      <AllPost />
    </div>
  );
};

export default Home;
