import GetProfile from "../hooks/getProfile";
import MountainCard from "./mountain-card"

const Profile = () => {
  const profile = GetProfile();
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
      <h1>Profile: {profile.email}</h1>
      <div>
        {profile.favorites ? profile.favorites.map((mountain:string, i:number) => <MountainCard key={i} mountain={mountain} />) : <div>No favorites</div>}
      </div>
    </div>
  );
};

export default Profile;
