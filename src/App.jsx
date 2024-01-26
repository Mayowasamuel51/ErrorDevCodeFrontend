import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar"
import Api from "./components/Api";
import Main from "./pages/Mian";
import Url from "./pages/Url";
const router =  createBrowserRouter([
  {
    path:"/",
    element:<Navbar/>,
    children:[
      {
        index:true,
        element:<Main/>
      },
      {
        path:'/api',
        element:<Api/>
      },
      {
        path:'/url',
        element:<Url/>
      }
    ]
  }
])
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
