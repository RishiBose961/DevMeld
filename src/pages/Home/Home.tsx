import { useSelector } from "react-redux";
import AllPost from "../post/AllPost";
import Recommad from "../post/Recommad";
import SearchRecommad from "../post/SearchRecommad";

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
        isAuthenticated && <SearchRecommad/>
      }
      {
        isAuthenticated && <Recommad />
      }


      <AllPost />
    </div>
  );
};

export default Home;
