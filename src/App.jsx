import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const LazyAuthLayout = React.lazy(() => import("./layoutAuth/AdminLayout"));
import HomeLayout from "./layoutAuth/HomeLayout";
import Loader from "./components/Loader";
import Url from "./pages/Url";
import ApiKey from "./pages/Apikey";
import Portfoilo from "./pages/Portfoilo";
import ErrorCode from "./pages/ErrroCode";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [

    ],
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
        element: <Url />,
      },
      {
        path:"websiteurl",
        element: <Url />,
      },
      {
        path: "apikeys",
        element: <ApiKey />,
      },

      {
        path: "portfoilo",
        element: <Portfoilo />,
      },
      {
        path: "seeportfoilo",
        element: <Portfoilo />,
      },
      {
        path: "errorcode",
        element: <ErrorCode />,
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
