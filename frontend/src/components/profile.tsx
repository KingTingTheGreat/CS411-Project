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
    <div className="w-full flex flex-col items-center">
      <h3 className="text-4xl text-center m-2">User: {profile.email}</h3>
      <div className="w-4/5 flex flex-wrap justify-center p-2">
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
