
// import { useState,useEffect } from "react";
// import {useNavigate, useParams} from "react-router-dom"
// import api from "../api/PreApi";

// const Expenses=()=>{
   
//     const navigate=useNavigate();
//     const url=useParams();
//     const [changeInExpenses,setChangeInExpenses]=useState({});
//     const [expensesIn,setExpensesIn]=useState([]);

//     async function getExpenses(){
//         try{
//             const data=await api.get(`/groups/${url.groupId}/expenses`);
//             setExpensesIn(data.data.expenses);
//         }
//         catch(err){
//             const errMsg=err.response?.data.message||err||"";
//             navigate("/error",{state:{message:errMsg}});
//         }
        
//     }

//     useEffect(()=>{
//         getExpenses();
//     },[changeInExpenses])

//     async function deleteExpense(id){
//         const data=await api.delete(`/groups/${url.groupId}/expenses/${id}`);
//         setChangeInExpenses(data.data);
//     }

//     return <>
//     <div className="flex flex-col justify-center items-center mt-20 mb-20">

//         {/* showing all expenses of the group in which the user is a member or has created */}
//         <div>
//             {expensesIn.map((el,idx)=>{
//                 return (
//                     <div key={idx} className="p-2 border ">
//                         <h4><span className="font-bold">Expense Name:</span>{el.expName}</h4>
//                         <p><span className="font-bold">Expense Description:</span>{el.expDescription}</p>
//                         <button onClick={()=>{deleteExpense(el._id)}} className="p-1 cursor-pointer bg-red-500 text-white rounded-3xl">Delete</button>
//                         <button onClick={()=>{navigate("/updateexpense",{state:{element:el}})}} className="p-1 cursor-pointer bg-yellow-500 text-white rounded-3xl">Update Expense</button>
//                         <button onClick={()=>{navigate(`/groups/${url.groupId}/expenses/${el._id}`,{state:{element:el}})}} className="p-1 cursor-pointer bg-black text-white rounded-3xl">View This Expense</button>
//                     </div>
//                 )
//             })}
//         </div>

//             {/* button to add group or form to create group */}
//             <div onClick={()=>navigate("/addexpense",{state:{element:url.groupId}})}  className="p-4 border-2 border-dotted border-orange-800 flex gap-4 justify-center items-center cursor-pointer font-lato">
//                 <button >+</button>
//                 <h3>Create A New Expense</h3>
//             </div>
//     </div>
//     </>
// }

// export default Expenses;


import { useState,useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom"
import api from "../api/PreApi";

const Expenses=()=>{
   
    const navigate=useNavigate();
    const url=useParams();
    const [changeInExpenses,setChangeInExpenses]=useState({});
    const [expensesIn,setExpensesIn]=useState([]);

    async function getExpenses(){
        try{
            const data=await api.get(`/groups/${url.groupId}/expenses`);
            setExpensesIn(data.data.expenses);
        }
        catch(err){
            const errMsg=err.response?.data.message||err||"";
            navigate("/error",{state:{message:errMsg}});
        }
        
    }

    useEffect(()=>{
        getExpenses();
    },[changeInExpenses])

    async function deleteExpense(id){
        const data=await api.delete(`/groups/${url.groupId}/expenses/${id}`);
        setChangeInExpenses(data.data);
    }

    return <>
    <div className="flex flex-col justify-center items-center mt-12 mb-20 px-4 font-lato">

        {/* showing all expenses of the group in which the user is a member or has created */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {expensesIn.map((el,idx)=>{
                return (
                    <div key={idx} className="bg-white border border-[#BCB3B1]/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start gap-4 mb-3">
                                <h4 className="text-xl font-asul font-bold text-[#988B7B] tracking-wide break-all">
                                    {el.expName}
                                </h4>
                                <span className="bg-[#BCB3B1]/20 text-[#988B7B] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                    Expense
                                </span>
                            </div>
                            
                            <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                                {el.expDescription}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2.5 mt-auto">
                            <button onClick={()=>{navigate(`/groups/${url.groupId}/expenses/${el._id}`,{state:{element:el}})}} className="w-full py-2.5 cursor-pointer bg-black text-white hover:bg-slate-800 transition-colors text-sm font-medium rounded-3xl tracking-wide uppercase">
                                View This Expense
                            </button>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={()=>{navigate("/updateexpense",{state:{element:el}})}} className="py-2 cursor-pointer bg-[#988B7B]/20 hover:bg-[#988B7B]/35 text-[#988B7B] transition-colors text-xs font-bold rounded-3xl uppercase tracking-wider">
                                    Update
                                </button>
                                <button onClick={()=>{deleteExpense(el._id)}} className="py-2 cursor-pointer border border-red-200 hover:bg-red-50 text-red-500 transition-colors text-xs font-bold rounded-3xl uppercase tracking-wider">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

            {/* button to add group or form to create group */}
            <div onClick={()=>navigate("/addexpense",{state:{element:url.groupId}})}  className="w-full max-w-sm p-6 border-2 border-dashed border-[#988B7B]/60 hover:border-[#988B7B] hover:bg-[#F0F0F0]/50 transition-all rounded-2xl flex flex-col gap-2 justify-center items-center cursor-pointer font-lato group">
                <button className="w-10 h-10 rounded-full bg-[#988B7B] text-white flex justify-center items-center text-xl font-bold group-hover:scale-105 transition-transform">+</button>
                <h3 className="text-[#988B7B] font-bold text-lg tracking-wide mt-1">Create A New Expense</h3>
            </div>
    </div>
    </>
}

export default Expenses;