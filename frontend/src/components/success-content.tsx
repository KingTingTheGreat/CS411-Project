import { useParams } from "react-router-dom";
import ValidateToken from "../hooks/validateToken";

const LinkWrapper = ({ url, text }: { url: string; text: string }) => {
  return (
    <a className="px-4 py-2 m-1 text-2xl rounded-xl bg-gray-600" href={url}>
      {text}
    </a>
  );
};

const SuccessContent = () => {
  const { token } = useParams();
  localStorage.setItem("411ProjectToken", token as string);
  console.log(token);

  if (ValidateToken() === false) {
    return (
      <div>
        <h3>Sign in failed, please try again</h3>
      </div>
    );
  }

  window.location.href = "/";

  // this shouldn't be reached, but just in case redirect fails
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg">Successfully signed in!</h3>
      <LinkWrapper
        url="/"
        text="Check out popular mountains, conditions, and more"
      />
      <LinkWrapper url="/mountains-near-me" text="Find mountains near your" />
      <LinkWrapper url="/about" text="Learn more about this project" />
      <LinkWrapper url="/profile" text="View your account information" />
    </div>
  );
};

export default SuccessContent;
