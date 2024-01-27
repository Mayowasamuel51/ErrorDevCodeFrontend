import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useStateContext } from "../context/ContextProvider";
const HomeLayout =()=>{
    const {token }= useStateContext()

    if(token){
        return <Navigate to="/dashboard"/>
    }

    return ( 
        <div>
            <Navbar/>

            
            <Outlet/>
        </div>
    )
}

export default HomeLayout;