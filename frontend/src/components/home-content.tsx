import SignIn from "./sign-in";
import MountainCardId from "./mountain-card-id";
import GetProfile from "../hooks/getProfile";

// placeholder data
const topMountains: string[] = ["vail", "breck", "keystone"];

const HomeContent = () => {
  // user is not signed in, show them the sign in button
  const profile = GetProfile();
  if (!profile) return <SignIn />;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-2/3 bg-gray-500 p-1 m-2 rounded-lg">
        <h3 className="text-6xl text-center m-2">Popular mountains</h3>
        <div className="flex flex-wrap">
          {topMountains.map((mountainId) => (
            <MountainCardId
              key={mountainId}
              id={mountainId}
              favorites={profile.favorites}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
