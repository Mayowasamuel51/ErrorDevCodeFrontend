import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Api from "./components/Api";
import Main from "./pages/Mian";
import Url from "./pages/Url";
import HomeLayout from "./layoutAuth/HomeLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children:[
    
    
    ]
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
