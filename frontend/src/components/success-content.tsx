import { useParams } from "react-router-dom";
import validateToken from "../hooks/validateToken";

const SuccessContent = () => {
  console.log("SuccessContent");
  const { token } = useParams();
  localStorage.setItem("411ProjectToken", token as string);

  if (validateToken() === false) {
    console.log("Invalid token");
    return <div>Sign in failed, please try again</div>;
  }

  console.log("valid token");
  return <div>Sucessfully signed in!</div>;
};

export default SuccessContent;
