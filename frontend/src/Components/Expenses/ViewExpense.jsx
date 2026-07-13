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
    <div className="flex flex-col justify-center items-center my-20">
        <h4><span className="font-bold">Expense Name:</span>{element.expName}</h4>
        <p><span className="font-bold">Expense Description:</span>{element.expDescription}</p>
        <p><span className="font-bold">Who Paid:</span>{element.whoPaid}</p>
        <p><span className="font-bold">For Whom Paid:</span>{element.forWhomPaid}</p>
        <p><span className="font-bold">Total Amount Due:</span>{element.totalAmtDue}</p>
        <button onClick={()=>navigate(-1)} className="p-2 bg-black text-white rounded-2xl">Go Back</button>
    </div>
    </>
}

export default ViewExpense;