import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import Navbar from "../components/Navbar";

const AdminLayout =()=>{
    const {token } = useStateContext()
    if(!token){
        return <Navigate to={`/`}/>
    }
    return ( 
        <div>
            <Navbar/>
            <Outlet/>
            {
                location.pathname === "/dashboard" ||
                location.pathname === "/dashboard/apikeys" 
                // ||
                // location.pathname === "/dashboard/comment" ||
                // location.pathname === "/dashboard/links"
                
            }

        </div>
    )
}

export default AdminLayout;