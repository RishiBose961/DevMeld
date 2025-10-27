import { useParams } from "react-router";

const PlayGround = () => {
    const { id } = useParams();

  return (
    <div>PlayGround { id }</div>
  )
}

export default PlayGround