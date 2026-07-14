// import {useNavigate, useParams } from "react-router-dom";
// import api from "../../api/PreApi";
// import { useEffect, useState } from "react";

// const ViewExpense=()=>{
//     const navigate=useNavigate();
//     const url=useParams();
//     const [element,setElement]=useState({
//         expName:"",
//         expDescription:"",
//         whoPaid:"",
//         forWhomPaid:"",
//         totalAmtPaid:""
//     });
    
//     async function getExpense(){
//         try{
//             const data=await api.get(`/groups/${url.groupId}/expenses/${url.id}`);
//             setElement(data.data);
//         }
//         catch(err){
//             navigate("/error",{state:{message:err.response.data.message}});
//         }
//     }
//     useEffect(()=>{
//         getExpense();
//     },[])
//     if(!element){
//         navigate("/error");
//     }
//     return <>
//     <div className="flex flex-col justify-center items-center my-20">
//         <h4><span className="font-bold">Expense Name:</span>{element.expName}</h4>
//         <p><span className="font-bold">Expense Description:</span>{element.expDescription}</p>
//         <p><span className="font-bold">Who Paid:</span>{element.whoPaid.email}</p>
//         <p><span className="font-bold">For Whom Paid:</span>{element.forWhomPaid.email}</p>
//         <p><span className="font-bold">Total Amount Due:</span>{element.totalAmtDue}</p>
//         <button onClick={()=>navigate(-1)} className="p-2 bg-black text-white rounded-2xl">Go Back</button>
//     </div>
//     </>
// }

// export default ViewExpense;

import {useNavigate, useParams } from "react-router-dom";
import api from "../../api/PreApi";
import { useEffect, useState } from "react";

const ViewExpense=()=>{
    const navigate=useNavigate();
    const url=useParams();
    const [element,setElement]=useState({
        expName:"",
        expDescription:"",
        whoPaid:"",
        forWhomPaid:"",
        totalAmtPaid:""
    });
    
    async function getExpense(){
        try{
            const data=await api.get(`/groups/${url.groupId}/expenses/${url.id}`);
            setElement(data.data);
        }
        catch(err){
            navigate("/error",{state:{message:err.response.data.message}});
        }
    }
    useEffect(()=>{
        getExpense();
    },[])
    if(!element){
        navigate("/error");
    }
    return <>
    <div className="flex flex-col justify-center items-center mt-12 mb-20 px-4 font-lato">
        <div className="w-full max-w-md bg-white border border-[#BCB3B1]/40 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-asul font-bold text-center text-[#988B7B] tracking-wide mb-8">
                Expense Details
            </h2>

            <div className="flex flex-col gap-5 mb-8">
                <div className="border-b border-slate-100 pb-3">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-1">Expense Name</span>
                    <h4 className="text-lg font-bold text-slate-800">{element.expName || "—"}</h4>
                </div>

                <div className="border-b border-slate-100 pb-3">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-1">Expense Description</span>
                    <p className="text-slate-600 text-sm leading-relaxed">{element.expDescription || "—"}</p>
                </div>

                <div className="border-b border-slate-100 pb-3">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-1">Who Paid</span>
                    <p className="text-slate-700 text-sm font-semibold">{element.whoPaid?.email || "—"}</p>
                </div>

                <div className="border-b border-slate-100 pb-3">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-1">For Whom Paid</span>
                    <p className="text-slate-700 text-sm font-semibold">{element.forWhomPaid?.email || "—"}</p>
                </div>

                <div>
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-1">Total Amount Due</span>
                    <p className="text-xl font-bold text-[#988B7B]">{element.totalAmtDue !== undefined ? element.totalAmtDue : "—"}</p>
                </div>
            </div>

            <button onClick={()=>navigate(-1)} className="w-full p-3 bg-black text-white hover:bg-slate-800 transition-colors text-sm font-medium rounded-3xl tracking-wide uppercase cursor-pointer">
                Go Back
            </button>
        </div>
    </div>
    </>
}

export default ViewExpense;