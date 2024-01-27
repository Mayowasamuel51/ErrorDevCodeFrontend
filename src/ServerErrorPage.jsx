import { useNavigate } from 'react-router-dom';
import NavBar from '../src/components/Navbar';


const ServerErrorPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <NavBar />
            <div className='min-h-screen flex justify-center items-center text-center'>
                <div>
                    <h1 className='font-black md:text-4xl'>SERVER ERROR😢</h1>
                    <p onClick={()=> navigate("/")} className='underline text-blue-600'>
                        Go Back
                    </p>
                </div>
            </div>
           
        </>
  )
}

export default ServerErrorPage