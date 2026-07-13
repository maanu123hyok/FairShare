import { useLocation,NavLink, useNavigate } from "react-router-dom";
import api from "../../api/PreApi";
import { useState } from "react";

const UpdateGroup=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const element=location.state.element;
    const [memberCount,setMemberCount]=useState(1);
    const [groupCredentials, setGroupCredentials] = useState({
        grpName: element.grpName,
        grpDescription: element.grpDescription,
        grpMembers: [],
      });
    
      function handleChange(e, idx) {
        setGroupCredentials((prev) => {
          if (idx != null) {
            const updatedMembers = [...prev.grpMembers];
            (e.target.value===""||e.target.value===" ")?updatedMembers=element.grpMembers:updatedMembers[idx] = e.target.value;
            return {
              ...prev,
              grpMembers: updatedMembers,
            };
          }
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
        });
      }
    
    async function updateGroup(e){
        e.preventDefault();
        try{
            const data=await api.patch(`/groups/${element._id}`,groupCredentials);
            navigate("/groups");
        }
        catch(err){
            const errMsg=err.response?.data?.message||err||"";
            navigate("/error",{state:{message:errMsg}});
        }
    }
    return <>
       <div>
        {element?
           <form
           onSubmit={updateGroup}
           className="flex flex-col justify-center items-center"
         >
           <div className="flex flex-col justify-center items-center mb-5">
             <label>Updated Group Name:</label>
             <input
               name="grpName"
               value={groupCredentials.grpName}
               onChange={handleChange}
               type="text"
               className="p-1 border rounded-2xl"
             ></input>
           </div>
 
           <div className="flex flex-col justify-center items-center mb-5">
             <label>Updated Group Description:</label>
             <input
               name="grpDescription"
               value={groupCredentials.grpDescription}
               onChange={handleChange}
               type="text"
               className="p-1 border rounded-2xl "
             ></input>
           </div>
 
           <div className="flex flex-col justify-center items-center gap-2 mb-5">
             <label>Updated Group Members:</label>
             <div className="flex flex-col">
               {Array.from({ length: memberCount }).map((el, idx) => {
                 return (
                   <input
                     key={idx}
                     name="grpMembers"
                     value={groupCredentials.grpMembers[idx] || ""}
                     onChange={(el) => handleChange(el, idx)}
                     type="email"
                     className="p-1 border rounded-3xl "
                   ></input>
                 );
               })}
             </div>
             <button
               onClick={() => setMemberCount((prev) => prev + 1)}
               type="button"
               className="p-1 bg-yellow-200 cursor-pointer"
             >
               +Add another group member
             </button>
           </div>
 
           <button className="p-3 bg-black text-white rounded-4xl cursor-pointer">
                UPDATE
           </button>
         </form>
         :<button className="p-3 bg-black text-white mt-10 mb-10" ><NavLink to="/">Go To Home</NavLink></button>}
      </div>
    </>
}

export default UpdateGroup;