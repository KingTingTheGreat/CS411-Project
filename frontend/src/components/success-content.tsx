import { useParams } from "react-router-dom";
import validateToken from "../hooks/validateToken";

const SuccessContent = () => {
  const { token } = useParams();
  localStorage.setItem("411ProjectToken", token as string);

  if (validateToken() === false) {
    return <div>Sign in failed, please try again</div>;
  }

  return <div>Sucessfully signed in!</div>;
};

export default SuccessContent;
