import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/PreApi";

const RemoveMember=()=>{
    const navigate=useNavigate();
    const location=useLocation();
    const element=location.state?.element;
    const [memberCount,setMemberCount]=useState(1);
    const [groupWithOldMembersToBeRemoved,setGroupWithOldMembersToBeRemoved]=useState({...element,grpMembers:[]})
    function handleChange(e,idx){
        setGroupWithOldMembersToBeRemoved(prev=>{
            let oldMembers=[...groupWithOldMembersToBeRemoved.grpMembers];
            oldMembers[idx]=e.target.value;
            return({...prev,grpMembers:oldMembers});
        })
    }
    async function removeMembersGroup(e){
        e.preventDefault();
        try{
            const data=await api.patch(`/groups/${element._id}/members/remove`,groupWithOldMembersToBeRemoved);
            navigate("/groups");
        }
        catch(err){
            const errMsg=err?.response?.data?.message||err||"";
            navigate("/error",{state:{message:errMsg}});
        }
    }
   
    return <>
         <div className="flex flex-col justify-center items-center">
            {element?
            <form onSubmit={removeMembersGroup} className="flex flex-col justify-center items-center">
            <label>Add Email Id Of Members To Be Removed:</label>
            <div className="flex flex-col">
                {Array.from({length:memberCount}).map((el,idx)=>{
                    return (
                        <input key={idx} onChange={(e)=>{handleChange(e,idx)}} value={groupWithOldMembersToBeRemoved.grpMembers[idx]||""} type="email" name="grpMembers"  className="p-1 border rounded-3xl"></input>
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

export default RemoveMember;