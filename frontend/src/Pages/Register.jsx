// import { useState } from "react";
// import axios from "axios";
// import { NavLink, useNavigate } from "react-router-dom";

// const Register=()=>{
//     const navigate=useNavigate();
//     const [credentials,setCredentials]=useState({
//         name:"",
//         email:"",
//         password:"",
//     })
//     const registerFields=["name","email","password"];
//     function handleChange(e){
//         setCredentials(prev=>{
//            return{...prev,[e.target.name]:e.target.value}
//         })
//     }
//     async function handleSubmit(e){
//         e.preventDefault();
//         try{
//             const data=await axios.post("http://localhost:2000/api/auth/register",credentials);
//             const token=data.data.token;
//             localStorage.setItem("token",token);
//             navigate('/');
//         }
//         catch(err){
//             navigate('/error',{state:{message:err.response.data.message}});
//         }
//         setCredentials({
//             name:"",
//             email:"",
//             password:""
//         })
//     }
//     return <>
//     <div className="flex flex-col justify-center items-center bg-[#f9f3ea] mb-40">
//         <h2 className="mb-5 mt-10">Register Here</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
//             {registerFields.map(el=>{
//                 return (
//                     <div key={el} className="flex flex-col justify-center items-center mb-4">
//                         <label>{el.slice(0,1).toUpperCase()+el.slice(1,el.length)}</label>
//                         <input type={el==="name"?"text":el} name={el} value={credentials[el]} onChange={handleChange} className="border border-[#BCB3B1] rounded-md w-md text-shadow-transparent"></input>
//                     </div>
//                 )
//             })}

//             <p>If Already Registered  
//                 <NavLink className="text-blue-800" to="/login">
//                     Login Here
//                 </NavLink>
//             </p>

//             <button className="p-4 mt-4 bg-black text-white ">Submit</button>
//         </form>
//     </div>
//     </>
// }

// export default Register;

import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Register=()=>{
    const navigate=useNavigate();
    const [credentials,setCredentials]=useState({
        name:"",
        email:"",
        password:"",
    })
    const registerFields=["name","email","password"];
    function handleChange(e){
        setCredentials(prev=>{
           return{...prev,[e.target.name]:e.target.value}
        })
    }
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const data=await axios.post("http://localhost:2000/api/auth/register",credentials);
            const token=data.data.token;
            localStorage.setItem("token",token);
            navigate('/');
        }
        catch(err){
            navigate('/error',{state:{message:err.response.data.message}});
        }
        setCredentials({
            name:"",
            email:"",
            password:""
        })
    }
    return <>
    <div className="flex flex-col justify-center items-center mt-12 mb-20 px-4 font-lato">
        <div className="w-full max-w-md bg-white border border-[#BCB3B1]/40 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-asul font-bold text-center text-[#988B7B] tracking-wide mb-8">
                Register Here
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col">
                {registerFields.map(el=>{
                    return (
                        <div key={el} className="flex flex-col mb-5">
                            <label className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">
                                {el.slice(0,1).toUpperCase()+el.slice(1,el.length)}
                            </label>
                            <input 
                                type={el==="name"?"text":el} 
                                name={el} 
                                value={credentials[el]} 
                                onChange={handleChange} 
                                placeholder={
                                    el === "name" ? "Your Name" : 
                                    el === "email" ? "your.email@example.com" : 
                                    "••••••••"
                                }
                                className="p-2.5 border border-slate-200 rounded-3xl outline-none focus:border-[#988B7B] transition-colors w-full"
                            />
                        </div>
                    )
                })}

                <p className="text-slate-500 text-xs text-center mt-2 mb-6">
                    If Already Registered,{" "}
                    <NavLink className="text-[#988B7B] hover:text-[#988B7B]/80 font-bold underline transition-colors" to="/login">
                        Login Here
                    </NavLink>
                </p>

                <button className="w-full p-3 bg-black text-white hover:bg-slate-800 transition-colors text-sm font-medium rounded-3xl tracking-wide cursor-pointer uppercase">
                    Submit
                </button>
            </form>
        </div>
    </div>
    </>
}

export default Register;