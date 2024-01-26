import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { },
    FullScreen: null,
    setFullScreen: () => { }
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"))
    const [FullScreen, setFullScreen] = useState(false)
    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN")
        }
    }
    useEffect(()=> {
        const handleResize = ()=> {
            const size = window.innerWidth;
            size > 1024 ? setFullScreen(true) : setFullScreen(false)
        }
        handleResize()

        window.addEventListener("resize", handleResize)

        return ()=> window.removeEventListener("resize", handleResize)
    }, [FullScreen])
   
    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            FullScreen,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)