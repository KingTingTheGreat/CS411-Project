import ValidateToken from "../hooks/validateToken";
import SignIn from "./sign-in"
import MountainCard from "./mountain-short-card";
import { MountainShort } from "../types"

// placeholder data
const exampleMountains: MountainShort[] = [
  { 
    id: 1,
    name: "Vail",
    region: "NA",
    country: "United States"
  },
  {
    id: 2,
    name: "Park City",
    region: "NA",
    country: "United States"
  },
  {
    id:3,
    name: "Verbier",
    region: "EU",
    country: "Switzerland"
  },
  {
    id:4,
    name: "Whistler",
    region: "NA",
    country: "Canada"
  },
  {
    id: 5,
    name: "Mont Tremblant",
    region: "NA",
    country: "Canada"
  },
  {
    id:6,
    name: "Courcheval",
    region: "EU",
    country: "France"
  },
  {
    id: 7,
    name: "Killington",
    region: "NA",
    country: "United States"
  },
  {
    id: 8,
    name: "Niseko",
    region: "APAC",
    country: "Japan"
  }
]

const HomeContent = () => {
  // user is not signed in, show them the sign in button
  if (!ValidateToken()) return <SignIn />
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-3/5 bg-gray-500 p-2 m-2 rounded-lg">
        <h3 className="text-6xl text-center m-2">Popular mountains</h3>
        <div className="flex flex-wrap p-2">
          {exampleMountains.map((mountain) => <MountainCard mountain={mountain} />)}
        </div>
      </div>
    </div>
  )
};

export default HomeContent;
