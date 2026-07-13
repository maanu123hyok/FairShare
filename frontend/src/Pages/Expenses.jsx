
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
    <div className="flex flex-col justify-center items-center mt-20 mb-20">

        {/* showing all expenses of the group in which the user is a member or has created */}
        <div>
            {expensesIn.map((el,idx)=>{
                return (
                    <div key={idx} className="p-2 border ">
                        <h4><span className="font-bold">Expense Name:</span>{el.expName}</h4>
                        <p><span className="font-bold">Expense Description:</span>{el.expDescription}</p>
                        <button onClick={()=>{deleteExpense(el._id)}} className="p-1 cursor-pointer bg-red-500 text-white rounded-3xl">Delete</button>
                        <button onClick={()=>{navigate("/updateexpense",{state:{element:el}})}} className="p-1 cursor-pointer bg-yellow-500 text-white rounded-3xl">Update Expense</button>
                        <button onClick={()=>{navigate(`/groups/${url.groupId}/expenses/${el._id}`,{state:{element:el}})}} className="p-1 cursor-pointer bg-black text-white rounded-3xl">View This Expense</button>
                    </div>
                )
            })}
        </div>

            {/* button to add group or form to create group */}
            <div onClick={()=>navigate("/addexpense",{state:{element:url.groupId}})}  className="p-4 border-2 border-dotted border-orange-800 flex gap-4 justify-center items-center cursor-pointer font-lato">
                <button >+</button>
                <h3>Create A New Expense</h3>
            </div>
    </div>
    </>
}

export default Expenses;