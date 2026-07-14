// import { useState } from "react";
// import { useLocation, useNavigate,NavLink } from "react-router-dom";
// import api from "../../api/PreApi";

// const RemoveMember=()=>{
//     const navigate=useNavigate();
//     const location=useLocation();
//     const element=location.state?.element;
//     const [memberCount,setMemberCount]=useState(1);
//     const [groupWithOldMembersToBeRemoved,setGroupWithOldMembersToBeRemoved]=useState({...element,grpMembers:[]})
//     function handleChange(e,idx){
//         setGroupWithOldMembersToBeRemoved(prev=>{
//             let oldMembers=[...groupWithOldMembersToBeRemoved.grpMembers];
//             oldMembers[idx]=e.target.value;
//             return({...prev,grpMembers:oldMembers});
//         })
//     }
//     async function removeMembersGroup(e){
//         e.preventDefault();
//         try{
//             const data=await api.patch(`/groups/${element._id}/members/remove`,groupWithOldMembersToBeRemoved);
//             navigate("/groups");
//         }
//         catch(err){
//             const errMsg=err?.response?.data?.message||err||"";
//             navigate("/error",{state:{message:errMsg}});
//         }
//     }
   
//     return <>
//          <div className="flex flex-col justify-center items-center">
//             {element?
//             <form onSubmit={removeMembersGroup} className="flex flex-col justify-center items-center">
//             <label>Add Email Id Of Members To Be Removed:</label>
//             <div className="flex flex-col">
//                 {Array.from({length:memberCount}).map((el,idx)=>{
//                     return (
//                         <input key={idx} onChange={(e)=>{handleChange(e,idx)}} value={groupWithOldMembersToBeRemoved.grpMembers[idx]||""} type="email" name="grpMembers"  className="p-1 border rounded-3xl"></input>
//                     )
//                 })}
//             </div>
//             <button
//           onClick={() => setMemberCount((prev) => prev + 1)}
//           type="button"
//           className="p-1 bg-yellow-200 cursor-pointer"
//         >
//           +Add 
//         </button>
//         <button className="bg-black text-white p-2">Submit</button>
//         </form>
//         :<button className="p-3 bg-black text-white mt-10 mb-10" ><NavLink to="/">Go To Home</NavLink></button>}
//         </div>
//     </>
// }

// export default RemoveMember;



import { useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
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
         <div className="flex flex-col justify-center items-center mt-12 mb-20 px-4 font-lato">
            {element?
            <div className="w-full max-w-md bg-white border border-[#BCB3B1]/40 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-asul font-bold text-center text-[#988B7B] tracking-wide mb-2">
                    Remove Members
                </h2>
                <p className="text-slate-400 text-sm text-center mb-8 uppercase tracking-wider font-semibold">
                    Group: {element.grpName}
                </p>

                <form onSubmit={removeMembersGroup} className="flex flex-col">
                    <label className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-3">Add Email Id Of Members To Be Removed:</label>
                    <div className="flex flex-col gap-2.5 mb-6">
                        {Array.from({length:memberCount}).map((el,idx)=>{
                            return (
                                <input 
                                    key={idx} 
                                    onChange={(e)=>{handleChange(e,idx)}} 
                                    value={groupWithOldMembersToBeRemoved.grpMembers[idx]||""} 
                                    type="email" 
                                    name="grpMembers"  
                                    placeholder="member.to.remove@email.com"
                                    className="p-2.5 border border-slate-200 rounded-3xl outline-none focus:border-[#988B7B] transition-colors"
                                />
                            )
                        })}
                    </div>
                    
                    <button
                        onClick={() => setMemberCount((prev) => prev + 1)}
                        type="button"
                        className="w-full py-2 px-4 border border-dashed border-[#988B7B]/60 text-[#988B7B] text-xs font-bold rounded-3xl hover:bg-[#F0F0F0]/50 transition-colors cursor-pointer text-center mb-8"
                    >
                        + Add another email
                    </button>
                    
                    <button className="w-full p-3 bg-black text-white hover:bg-slate-800 transition-colors text-sm font-medium rounded-3xl tracking-wide cursor-pointer uppercase">
                        Submit
                    </button>
                </form>
            </div>
            :<button className="p-3 bg-black text-white mt-10 mb-10 rounded-3xl hover:bg-slate-800 transition-colors text-sm uppercase tracking-wider font-semibold cursor-pointer px-6" ><NavLink to="/">Go To Home</NavLink></button>}
        </div>
    </>
}

export default RemoveMember;