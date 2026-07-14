import {NavLink} from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useEffect,useState } from "react";

const authOptions=["login","register"];

const Navbar=()=>{
    const [token,setToken]=useState(localStorage.getItem("token"));
    useEffect(()=>{
        setToken(localStorage.getItem("token"));
    },[token])
    return (
        <>
        <div className="bg-[#F0F0F0] font-lato py-3 px-4 flex justify-between items-center shadow-md">

            {/* logo and name */}
            <div className="flex items-center gap-2">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img src="../logo.png" alt="logo" className="h-full w-full object-cover"></img>
                </div>
                <h1 className="font-asul text-lg cursor-pointer"><NavLink to="/">FairShare</NavLink></h1>
            </div>
            
            {/* navoptions */}
            <div className="flex gap-1 justify-center items-center">
                <ul className="flex gap-4">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to={token?"groups":"register"}>CreateYourGroups</NavLink>
                </ul>

                <span className="text-slate-600 text-3xl">|</span>

                <div className="flex justify-center items-center gap-2">
                    {authOptions.map(el=>{
                        return (
                            <button key={el} className="bg-black py-1 px-3 rounded-3xl cursor-pointer">
                                 <NavLink to={el} className="text-white text-sm flex justify-center items-center gap-3">{el.slice(0,1).toUpperCase()+el.slice(1,el.length)} <FaArrowRight/></NavLink>
                            </button>
                        )
                        })}
                </div>                 
            </div>

            {/* profile icon-showing either dashboard or a page to authenticate yourself */}
            <div>
                <NavLink to={token?"dashboard":"register"}>
                <img src="../profile-icon.jpg" alt="profile-icon" className="h-14 w-14 rounded-full cursor-pointer" ></img>
                </NavLink>
            </div>

        </div>
        </>
    )
}

export default Navbar;

