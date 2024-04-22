import GetProfile from "../hooks/getProfile";

const Profile = () => {
  const profile = GetProfile();
  console.log(profile);
  if (!profile)
    return (
      <div>
        <h1>Profile</h1>
        <div>you must be logged in to view your profile</div>
        <a href="http://localhost:6969/auth/google">Login</a>
      </div>
    );

  return (
    <div>
      <h1>Profile</h1>
      <div>you are logged in</div>
    </div>
  );
};

export default Profile;
