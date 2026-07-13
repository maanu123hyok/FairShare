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
    <div className="flex flex-col justify-center items-center bg-[#f9f3ea] mb-40">
        <h2 className="mb-5 mt-10">Register Here</h2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
            {registerFields.map(el=>{
                return (
                    <div key={el} className="flex flex-col justify-center items-center mb-4">
                        <label>{el.slice(0,1).toUpperCase()+el.slice(1,el.length)}</label>
                        <input type={el==="name"?"text":el} name={el} value={credentials[el]} onChange={handleChange} className="border border-[#BCB3B1] rounded-md w-md text-shadow-transparent"></input>
                    </div>
                )
            })}

            <p>If Already Registered  
                <NavLink className="text-blue-800" to="/login">
                    Login Here
                </NavLink>
            </p>

            <button className="p-4 mt-4 bg-black text-white ">Submit</button>
        </form>
    </div>
    </>
}

export default Register;