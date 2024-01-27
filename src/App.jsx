import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const LazyAuthLayout = React.lazy(() => import("./layoutAuth/AdminLayout"));
import HomeLayout from "./layoutAuth/HomeLayout";
import Loader from "./components/Loader";
import Url from "./pages/Url";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [],
  },

  {
    path: "/dashboard",
    element: (
      <React.Suspense fallback={<Loader />}>
        <LazyAuthLayout />
      </React.Suspense>
    ),
    children: [
      {
        index: true,
        element:<Url/>
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
