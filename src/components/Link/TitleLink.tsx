import { Link } from "react-router";

interface TitleLinkProps {
  text: string;
  valuetext: string; 
}

const TitleLink = ({ text, valuetext }: TitleLinkProps) => {
  // Match the @username at the end
  const match = text.match(/(.*?)(@\w+)$/);

  if (!match) return <span className={`text-${valuetext}`}>{text}</span>; 

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, title, username] = match;

  return (
    <span className={`text-${valuetext} text-white`}>
      {title}{" "}
      <Link
        to={`/${username}`}
        className="text-blue-500 hover:underline visited:text-purple-600"
      >
        {username}
      </Link>
    </span>
  );
};

export default TitleLink;
