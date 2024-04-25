import GetProfile from "../hooks/getProfile";
import MountainCardId from "./mountain-card-id";

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
        {profile.favorites ? (
          profile.favorites.map((mountain: string, i: number) => (
            <MountainCardId
              key={i}
              id={mountain}
              favorites={profile.favorites}
            />
          ))
        ) : (
          <div>no favorites</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
