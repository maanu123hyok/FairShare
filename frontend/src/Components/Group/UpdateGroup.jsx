// import { useLocation,NavLink, useNavigate } from "react-router-dom";
// import api from "../../api/PreApi";
// import { useState } from "react";

// const UpdateGroup=()=>{
//     const location=useLocation();
//     const navigate=useNavigate();
//     const element=location.state.element;
//     const [memberCount,setMemberCount]=useState(1);
//     const [groupCredentials, setGroupCredentials] = useState({
//         grpName: element.grpName,
//         grpDescription: element.grpDescription,
//         grpMembers: [],
//       });
    
//       function handleChange(e, idx) {
//         setGroupCredentials((prev) => {
//           if (idx != null) {
//             const updatedMembers = [...prev.grpMembers];
//             (e.target.value===""||e.target.value===" ")?updatedMembers=element.grpMembers:updatedMembers[idx] = e.target.value;
//             return {
//               ...prev,
//               grpMembers: updatedMembers,
//             };
//           }
//           return {
//             ...prev,
//             [e.target.name]: e.target.value,
//           };
//         });
//       }
    
//     async function updateGroup(e){
//         e.preventDefault();
//         try{
//             const data=await api.patch(`/groups/${element._id}`,groupCredentials);
//             navigate("/groups");
//         }
//         catch(err){
//             const errMsg=err.response?.data?.message||err||"";
//             navigate("/error",{state:{message:errMsg}});
//         }
//     }
//     return <>
//        <div>
//         {element?
//            <form
//            onSubmit={updateGroup}
//            className="flex flex-col justify-center items-center"
//          >
//            <div className="flex flex-col justify-center items-center mb-5">
//              <label>Updated Group Name:</label>
//              <input
//                name="grpName"
//                value={groupCredentials.grpName}
//                onChange={handleChange}
//                type="text"
//                className="p-1 border rounded-2xl"
//              ></input>
//            </div>
 
//            <div className="flex flex-col justify-center items-center mb-5">
//              <label>Updated Group Description:</label>
//              <input
//                name="grpDescription"
//                value={groupCredentials.grpDescription}
//                onChange={handleChange}
//                type="text"
//                className="p-1 border rounded-2xl "
//              ></input>
//            </div>
 
//            <div className="flex flex-col justify-center items-center gap-2 mb-5">
//              <label>Updated Group Members:</label>
//              <div className="flex flex-col">
//                {Array.from({ length: memberCount }).map((el, idx) => {
//                  return (
//                    <input
//                      key={idx}
//                      name="grpMembers"
//                      value={groupCredentials.grpMembers[idx] || ""}
//                      onChange={(el) => handleChange(el, idx)}
//                      type="email"
//                      className="p-1 border rounded-3xl "
//                    ></input>
//                  );
//                })}
//              </div>
//              <button
//                onClick={() => setMemberCount((prev) => prev + 1)}
//                type="button"
//                className="p-1 bg-yellow-200 cursor-pointer"
//              >
//                +Add another group member
//              </button>
//            </div>
 
//            <button className="p-3 bg-black text-white rounded-4xl cursor-pointer">
//                 UPDATE
//            </button>
//          </form>
//          :<button className="p-3 bg-black text-white mt-10 mb-10" ><NavLink to="/">Go To Home</NavLink></button>}
//       </div>
//     </>
// }

// export default UpdateGroup;


import { useLocation,NavLink, useNavigate } from "react-router-dom";
import api from "../../api/PreApi";
import { useState } from "react";

const UpdateGroup=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const element=location.state?.element;
    const [memberCount,setMemberCount]=useState(1);
    const [groupCredentials, setGroupCredentials] = useState({
        grpName: element?.grpName || "",
        grpDescription: element?.grpDescription || "",
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
       <div className="flex flex-col justify-center items-center mt-12 mb-20 px-4 font-lato">
        {element?
         <div className="w-full max-w-md bg-white border border-[#BCB3B1]/40 p-8 rounded-2xl shadow-sm">
           <h2 className="text-2xl font-asul font-bold text-center text-[#988B7B] tracking-wide mb-2">
             Update Group
           </h2>
           <p className="text-slate-400 text-sm text-center mb-8 uppercase tracking-wider font-semibold">
             Editing: {element.grpName}
           </p>

           <form
             onSubmit={updateGroup}
             className="flex flex-col"
           >
             <div className="flex flex-col mb-5">
               <label className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Updated Group Name:</label>
               <input
                 name="grpName"
                 value={groupCredentials.grpName}
                 onChange={handleChange}
                 type="text"
                 className="p-2.5 border border-slate-200 rounded-3xl outline-none focus:border-[#988B7B] transition-colors"
               />
             </div>
   
             <div className="flex flex-col mb-5">
               <label className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Updated Group Description:</label>
               <input
                 name="grpDescription"
                 value={groupCredentials.grpDescription}
                 onChange={handleChange}
                 type="text"
                 className="p-2.5 border border-slate-200 rounded-3xl outline-none focus:border-[#988B7B] transition-colors"
               />
             </div>
   
             <div className="flex flex-col gap-2 mb-8">
               <label className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Updated Group Members:</label>
               <div className="flex flex-col gap-2.5">
                 {Array.from({ length: memberCount }).map((el, idx) => {
                   return (
                     <input
                       key={idx}
                       name="grpMembers"
                       value={groupCredentials.grpMembers[idx] || ""}
                       onChange={(el) => handleChange(el, idx)}
                       type="email"
                       placeholder="new.member@email.com"
                       className="p-2.5 border border-slate-200 rounded-3xl outline-none focus:border-[#988B7B] transition-colors"
                     />
                   );
                 })}
               </div>
               <button
                 onClick={() => setMemberCount((prev) => prev + 1)}
                 type="button"
                 className="mt-2 py-2 px-4 border border-dashed border-[#988B7B]/60 text-[#988B7B] text-xs font-bold rounded-3xl hover:bg-[#F0F0F0]/50 transition-colors cursor-pointer text-center"
               >
                 + Add another group member
               </button>
             </div>
   
             <button className="w-full p-3 bg-black text-white hover:bg-slate-800 transition-colors text-sm font-medium rounded-3xl tracking-wide cursor-pointer uppercase">
                  UPDATE
             </button>
           </form>
         </div>
         :<button className="p-3 bg-black text-white mt-10 mb-10 rounded-3xl hover:bg-slate-800 transition-colors text-sm uppercase tracking-wider font-semibold cursor-pointer px-6" ><NavLink to="/">Go To Home</NavLink></button>}
      </div>
    </>
}

export default UpdateGroup;