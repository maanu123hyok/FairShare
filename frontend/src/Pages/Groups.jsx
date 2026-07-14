// import { useState,useEffect } from "react";
// import {useNavigate} from "react-router-dom"
// import api from "../api/PreApi";

// const Groups=()=>{
//     const navigate=useNavigate();
//     const [changeInGroup,setChangeInGroup]=useState({});
//     const [groupsIn,setGroupsIn]=useState([]);

//     async function getGroups(){
//         const data=await api.get("/groups");
//         setGroupsIn(data.data);
//     }

//     useEffect(()=>{
//         getGroups();
//     },[changeInGroup])

//     async function deleteGroup(id){
//         const data=await api.delete(`/groups/${id}`);
//         setChangeInGroup(data.data);
//     }

//     return <>
//     <div className="flex flex-col justify-center items-center mt-20 mb-20">

//         {/* showing all groups in which the user is a member or has created */}
//         <div>
//             {groupsIn.map((el,idx)=>{
//                 return (
//                     <div key={idx} className="p-2 border ">
//                         <h4><span className="font-bold">Group Name:</span>{el.grpName}</h4>
//                         <p><span className="font-bold">Group Description:</span>{el.grpDescription}</p>
//                         <ul>
//                             <span className="font-bold">Group Members:</span>
//                             {el.grpMembers.map(members=>{
//                                 return (
//                                     <li key={members.email}>{members.email}</li>
//                                 )
//                             })}
//                         </ul>
//                         <button onClick={()=>{deleteGroup(el._id)}} className="p-1 cursor-pointer bg-red-500 text-white rounded-3xl">Delete</button>
//                         <button onClick={()=>{navigate("/addgroupmember",{state:{element:el}})}} className="p-1 cursor-pointer bg-green-500 text-white rounded-3xl">Add Members</button>
//                         <button onClick={()=>{navigate("/removegroupmember",{state:{element:el}})}} className="p-1 cursor-pointer bg-green-500 text-white rounded-3xl">Remove Members</button>
//                         <button onClick={()=>{navigate("/updategroup",{state:{element:el}})}} className="p-1 cursor-pointer bg-yellow-500 text-white rounded-3xl">Update Group</button>
//                         <button onClick={()=>{navigate(`/${el._id}/expenses`,{state:{element:el}})}} className="p-1 cursor-pointer bg-black text-white rounded-3xl">View Expenses</button>
//                     </div>
//                 )
//             })}
//         </div>

//             {/* button to add group or form to create group */}
//             <div onClick={()=>navigate("/addgroup")}  className="p-4 border-2 border-dotted border-orange-800 flex gap-4 justify-center items-center cursor-pointer font-lato">
//                 <button >+</button>
//                 <h3>Add A New Group</h3>
//             </div>
//     </div>
//     </>
// }

// export default Groups;

import { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom"
import api from "../api/PreApi";

const Groups=()=>{
    const navigate=useNavigate();
    const [changeInGroup,setChangeInGroup]=useState({});
    const [groupsIn,setGroupsIn]=useState([]);

    async function getGroups(){
        const data=await api.get("/groups");
        setGroupsIn(data.data);
    }

    useEffect(()=>{
        getGroups();
    },[changeInGroup])

    async function deleteGroup(id){
        const data=await api.delete(`/groups/${id}`);
        setChangeInGroup(data.data);
    }

    return <>
    <div className="flex flex-col justify-center items-center mt-12 mb-20 px-4 font-lato">

        {/* showing all groups in which the user is a member or has created */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {groupsIn.map((el,idx)=>{
                return (
                    <div key={idx} className="bg-white border border-[#BCB3B1]/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start gap-4 mb-3">
                                <h4 className="text-xl font-asul font-bold text-[#988B7B] tracking-wide break-all">
                                    {el.grpName}
                                </h4>
                                <span className="bg-[#BCB3B1]/20 text-[#988B7B] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                    Active
                                </span>
                            </div>
                            
                            <p className="text-slate-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                                {el.grpDescription}
                            </p>
                            
                            <div className="bg-[#F0F0F0]/60 p-3.5 rounded-xl mb-6 border border-slate-100">
                                <span className="font-bold text-xs uppercase tracking-wider text-slate-400 block mb-2">
                                    Group Members:
                                </span>
                                <ul className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                                    {el.grpMembers.map(members=>{
                                        return (
                                            <li key={members.email} className="bg-white border border-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-lg">
                                                {members.email}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5 mt-auto">
                            <button onClick={()=>{navigate(`/${el._id}/expenses`,{state:{element:el}})}} className="w-full py-2 cursor-pointer bg-black text-white hover:bg-slate-800 transition-colors text-sm font-medium rounded-3xl tracking-wide">
                                View Expenses
                            </button>
                            
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={()=>{navigate("/addgroupmember",{state:{element:el}})}} className="py-2 cursor-pointer bg-[#BCB3B1]/30 hover:bg-[#BCB3B1]/50 text-slate-700 transition-colors text-xs font-bold rounded-3xl">
                                    + Member
                                </button>
                                <button onClick={()=>{navigate("/removegroupmember",{state:{element:el}})}} className="py-2 cursor-pointer bg-[#BCB3B1]/30 hover:bg-[#BCB3B1]/50 text-slate-700 transition-colors text-xs font-bold rounded-3xl">
                                    - Member
                                </button>
                                <button onClick={()=>{navigate("/updategroup",{state:{element:el}})}} className="py-2 cursor-pointer bg-[#988B7B]/20 hover:bg-[#988B7B]/35 text-[#988B7B] transition-colors text-xs font-bold rounded-3xl">
                                    Update
                                </button>
                            </div>

                            <button onClick={()=>{deleteGroup(el._id)}} className="w-full py-1.5 cursor-pointer border border-red-200 hover:bg-red-50 text-red-500 transition-colors text-xs font-bold rounded-3xl mt-1">
                                Delete Group
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>

            {/* button to add group or form to create group */}
            <div onClick={()=>navigate("/addgroup")}  className="w-full max-w-sm p-6 border-2 border-dashed border-[#988B7B]/60 hover:border-[#988B7B] hover:bg-[#F0F0F0]/50 transition-all rounded-2xl flex flex-col gap-2 justify-center items-center cursor-pointer font-lato group">
                <button className="w-10 h-10 rounded-full bg-[#988B7B] text-white flex justify-center items-center text-xl font-bold group-hover:scale-105 transition-transform">+</button>
                <h3 className="text-[#988B7B] font-bold text-lg tracking-wide mt-1">Add A New Group</h3>
            </div>
    </div>
    </>
}

export default Groups;