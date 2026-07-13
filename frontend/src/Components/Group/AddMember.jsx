import api from "../../api/PreApi";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";


const AddMember=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const element=location.state?.element;
    const [memberCount,setMemberCount]=useState(1);
    const [groupWithAddedMembers,setGroupWithAddedMembers]=useState({...element,grpMembers:[]});

    function handleChange(e,idx){
            setGroupWithAddedMembers(prev=>{
                let updatedMembers=[...groupWithAddedMembers.grpMembers];
                updatedMembers[idx]=e.target.value;
                return ({...prev,grpMembers:updatedMembers})
            })
    }
    
    async function addMembersGroup(e){
        e.preventDefault();
        try{
            const data=await api.patch(`/groups/${location.state.element._id}/members/add`,groupWithAddedMembers);
            navigate("/groups");
        }
        catch(err){
            const message=err?.response?.data?.message||"";
            navigate("/error",{state:{message:message}});
        }
    }
    return <>
        <div className="flex flex-col justify-center items-center">
            {element?
            <form onSubmit={addMembersGroup} className="flex flex-col justify-center items-center">
                <label>Add Email Id Of New Members:</label>
                <div className="flex flex-col">
                    {Array.from({length:memberCount}).map((el,idx)=>{
                        return (
                            <input key={idx} onChange={(e)=>{handleChange(e,idx)}} value={groupWithAddedMembers.grpMembers[idx]||""} type="email" name="grpMembers"  className="p-1 border rounded-3xl"></input>
                        )
                    })}
                </div>
                <button
              onClick={() => setMemberCount((prev) => prev + 1)}
              type="button"
              className="p-1 bg-yellow-200 cursor-pointer"
            >
              +Add 
            </button>
            <button className="bg-black text-white p-2">Submit</button>
            </form>
            :<button className="p-3 bg-black text-white mt-10 mb-10" ><NavLink to="/">Go To Home</NavLink></button>}
        </div>
    </>
}

export default AddMember;