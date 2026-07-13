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
    <div className="flex flex-col justify-center items-center mt-20 mb-20">

        {/* showing all groups in which the user is a member or has created */}
        <div>
            {groupsIn.map((el,idx)=>{
                return (
                    <div key={idx} className="p-2 border ">
                        <h4><span className="font-bold">Group Name:</span>{el.grpName}</h4>
                        <p><span className="font-bold">Group Description:</span>{el.grpDescription}</p>
                        <ul>
                            <span className="font-bold">Group Members:</span>
                            {el.grpMembers.map(members=>{
                                return (
                                    <li key={members.email}>{members.email}</li>
                                )
                            })}
                        </ul>
                        <button onClick={()=>{deleteGroup(el._id)}} className="p-1 cursor-pointer bg-red-500 text-white rounded-3xl">Delete</button>
                        <button onClick={()=>{navigate("/addgroupmember",{state:{element:el}})}} className="p-1 cursor-pointer bg-green-500 text-white rounded-3xl">Add Members</button>
                        <button onClick={()=>{navigate("/removegroupmember",{state:{element:el}})}} className="p-1 cursor-pointer bg-green-500 text-white rounded-3xl">Remove Members</button>
                        <button onClick={()=>{navigate("/updategroup",{state:{element:el}})}} className="p-1 cursor-pointer bg-yellow-500 text-white rounded-3xl">Update Group</button>
                        <button onClick={()=>{navigate(`/${el._id}/expenses`,{state:{element:el}})}} className="p-1 cursor-pointer bg-black text-white rounded-3xl">View Expenses</button>
                    </div>
                )
            })}
        </div>

            {/* button to add group or form to create group */}
            <div onClick={()=>navigate("/addgroup")}  className="p-4 border-2 border-dotted border-orange-800 flex gap-4 justify-center items-center cursor-pointer font-lato">
                <button >+</button>
                <h3>Add A New Group</h3>
            </div>
    </div>
    </>
}

export default Groups;