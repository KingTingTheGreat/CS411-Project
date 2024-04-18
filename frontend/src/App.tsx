import Header from "./components/header.tsx";
import HomeContent from "./components/home-content.tsx";
import AboutContent from "./components/about-content.tsx";
import MountainsNearMeContent from "./components/mountains-near-me-content.tsx";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import AccountContent from "./components/account-content.tsx";

function Root() {
  return (
    <>
      <Header />
      <main className="m-0 flex flex-col items-center min-w-full min-h-full">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/about" element={<AboutContent />} />
          <Route
            path="/mountains-near-me"
            element={<MountainsNearMeContent />}
          />
          <Route path="/success" element={<div>Success!</div>} />
          <Route path="/account/:id" element={<AccountContent />} />
        </Routes>
      </main>
    </>
  );
}

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}
